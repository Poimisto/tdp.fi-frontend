'use strict';
const frontmatter = require('yaml-front-matter');
const marked = require('marked');
const fse = require('fs-extra');
const glob = require('glob');
const ejs = require('ejs')
const browserify = require('browserify');




require('dotenv').config({ path: __dirname + '/.env' });

const ContactApiEndpoint = process.env.ContactApiEndpoint || 'https://gcj1shtql7.execute-api.eu-west-1.amazonaws.com/v1/contact';
const FileSuffix = (process.env.FileSuffix) ? '.' + process.env.FileSuffix.replace(/^\./,'') : '.html';
const AppRootURL = process.env.AppRootURL || '';


// 
const PUBLIC_DIR = __dirname + '/public';
const TEMPLATES_DIR = __dirname + '/src/views';
const DEFAULT_TEMPLATE = 'page';
const SEARCH_INDEX_FILE = 'searchIndex.json';

/*
  passed to template rendering 
*/
const buildVars = {
  AppRootURL : AppRootURL,
  ContactApiEndpoint : ContactApiEndpoint,
  SearchIndex : AppRootURL + '/assets/' + SEARCH_INDEX_FILE,
  linkTo : function(path) { 
    if(!path) return AppRootURL;
    else if(path.match(/\/$/)) return AppRootURL + '/' + path.replace(/^\//, '')
    else return AppRootURL.replace(/\/$/, '') + '/' + ((path) ? path.replace(/^\//, '') : '') + FileSuffix; 
  },
  assetSrc : function(path){
    return AppRootURL.replace(/\/$/, '') + '/assets/' + path.replace(/^\//, '')
  },
};


/*
  configure how we pull the content to build process
  Update this to fetch data from e.g. content API (Contentful, Strapi, Github pages etc)
*/
async function getPosts(postTypes){
  let parsed = [];
  if(typeof postTypes == 'string') postTypes = [postTypes];
  for(var type of postTypes){
    if(type === 'posts' || type === 'pages') {

      // fetch from directory
      let globString = `${__dirname}/_${type}/**/[^_]*.*`;
      let fileList = glob.sync(globString);

      await Promise.all( fileList.map(async function(filename){

        // extract this to use as 
        var regex = new RegExp( __dirname.replace(/\\/g, '/') + '/_' + type );
        let relativePathToFile = filename.replace( regex, '' );

        let fileContents = await fse.readFile(filename, 'utf-8');
        let __parsed = frontmatter.loadFront(fileContents);

        // frontmatter loads body HTML/markdown to Object.__content
        if(__parsed.body) throw new Error('post ' + filename + ' is using reserved key "body"');
        // render ejs variables
    ;
        __parsed.body = ejs.render(__parsed.__content, buildVars);
        __parsed.body = marked(__parsed.body);
        delete __parsed.__content;

        // add required data
        let out = {
          _type : type,
          _absolutePath : filename,
          _relativePath : relativePathToFile,
          template : __parsed.template || null,
          path : __parsed.path || null,
          head : __parsed.head || {},
          body : __parsed.body || ""
        };
        // add rest of the stuff
        for(var key in __parsed) {
          if(!key.match(/^(template|path|head|body)$/)) {
            out[key] = __parsed[key];
          }
        }
        parsed.push(out);
      }));
    }

  }
  return parsed;
}
/*
  To do
*/
function validatePageData(page){
  return true;
}

/*
 build path for public directory
*/
function buildPublicPath(page){
    // create html filename
    let _publicPath = page._relativePath.replace(/\.[^\.]+$/, '');
    // override public path if provided in metadata
    if( page.path && page.path.length > 0 ) {
      // ensure path starts with leading /
      let _path = '/' + page.path.replace(/^[\/]+/, '');
      if(_path.match(/\/$/)) _publicPath = _path + 'index'; // replace roots with index
      else _publicPath = _path;
    }
    if(FileSuffix.length > 0) _publicPath = _publicPath + '.' + FileSuffix.replace(/^\./, '');

    if (page.basePath && page.basePath.length > 0) {
      // ensure path starts with leading / and ends without /
      let _basePath = '/' + page.basePath.replace(/^[\/]+/, '').replace(/[\/]+$/, '');
      _publicPath = _basePath + _publicPath;

    }

    // validation
    if(_publicPath.match(/^\/assets\//)) {
      throw new Error('Path can\'t begin with reserved path "/assets". Occured in file ' + page._absolutePath);
    }

    return _publicPath;
}

function generateHTML(page){
  let template = page.template || DEFAULT_TEMPLATE;
  let template_file = `${TEMPLATES_DIR}/${template}.ejs`;
  if (!fse.existsSync(template_file)) throw new Error(`Template '${template}' specified in ${page._absolutePath} does not exist`);

  return new Promise(function(resolve, reject){
    ejs.renderFile( template_file, Object.assign({}, page, buildVars ), function(err, body){
      if(err) reject(err)
      else resolve(body)
    })
  });
}
  
function buildSearchIndex(pages){
  const lunr = require('lunr');
  require("lunr-languages/lunr.stemmer.support")(lunr)
  require("lunr-languages/lunr.fi")(lunr)
  function cleanUpBody(string){
    return string
      .replace(/<[^>]+>/g, ' ')
      .replace(/[^0-9a-zA-ZÆÐƎƏƐƔĲŊŒẞÞǷȜæðǝəɛɣĳŋœĸſßþƿȝĄƁÇĐƊĘĦĮƘŁØƠŞȘŢȚŦŲƯY̨Ƴąɓçđɗęħįƙłøơşșţțŧųưy̨ƴÁÀÂÄǍĂĀÃÅǺĄÆǼǢƁĆĊĈČÇĎḌĐƊÐÉÈĖÊËĚĔĒĘẸƎƏƐĠĜǦĞĢƔáàâäǎăāãåǻąæǽǣɓćċĉčçďḍđɗðéèėêëěĕēęẹǝəɛġĝǧğģɣĤḤĦIÍÌİÎÏǏĬĪĨĮỊĲĴĶƘĹĻŁĽĿʼNŃN̈ŇÑŅŊÓÒÔÖǑŎŌÕŐỌØǾƠŒĥḥħıíìiîïǐĭīĩįịĳĵķƙĸĺļłľŀŉńn̈ňñņŋóòôöǒŏōõőọøǿơœŔŘŖŚŜŠŞȘṢẞŤŢṬŦÞÚÙÛÜǓŬŪŨŰŮŲỤƯẂẀŴẄǷÝỲŶŸȲỸƳŹŻŽẒŕřŗſśŝšşșṣßťţṭŧþúùûüǔŭūũűůųụưẃẁŵẅƿýỳŷÿȳỹƴźżžẓ\s-,.\']/g, ' ')
      .replace(/(\s|\r\n|\n)+/g, ' ');
  }
  function uriFromPath(path){
    return AppRootURL.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
  }
  return new Promise(function(resolve, reject){
    let index = lunr(function (builder) {
      builder.use(lunr.fi)
      builder.ref('uri');
      builder.field('title', { boost: 10 });
      builder.field('keywords', {boost: 8});
      builder.field('description', {boost: 2});

      // we could extract headings etc 
      builder.field('body');


      for(var i = 0; i < pages.length; i++){
        var uri = pages[i].uri;
        if(!uri) {
          uri = uriFromPath(pages[i].path);
        } 
        if(uri) {
          builder.add({
            uri : uri,
            title : pages[i].title,
            description : pages[i].description,
            keywords: pages[i].keywords,
            body : cleanUpBody(pages[i].body)
          })
        }
        else {
          console.log('UNABLE TO ADD FILE TO SEARCH INDEX, NO IDENTIFIER (uri or path)');
        }

      }
    });
    resolve(index);
  });
}
function extractPDFContent(pdfFile){
  let PDFParser = require("pdf2json");
  let pdfParser = new PDFParser(this, 1);
  return new Promise(function(resolve, reject){
    pdfParser.on("pdfParser_dataError", (errData) => {
      console.log(errData.parserError);
      reject(errData.parserError);  
    });
    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      resolve(pdfParser.getRawTextContent());
    });
    pdfParser.loadPDF(pdfFile);
  });
}
async function build() {

  let searchables = [];


  // create build dir
  await fse.mkdir(PUBLIC_DIR).catch( () => {} );
  // await fse.emptyDir(PUBLIC_DIR);

  let pages = await getPosts(['pages', 'posts']);

  for(var i = 0; i < pages.length; i++){
    if( !validatePageData(pages[i]) ){
      console.log('page ' + pages[i]._absolutePath + ' not valid, skipping'); continue;
    }
    pages[i]._path = buildPublicPath(pages[i]);

    // Todo: add check if this page needs to be searchable
    if(typeof pages[i].hideFromSearch === 'undefined' || !pages[i].hideFromSearch) {
      searchables.push({
        path : pages[i]._path.replace(/index\.html$/, ''),
        title : (pages[i].head) ? pages[i].head.title : "",
        description : (pages[i].head) ? pages[i].head.description : "",
        keywords : (pages[i].head) ? pages[i].head.keywords : "",
        body : pages[i].body || ""
      })
    }
  

  }

  await Promise.all(pages.map(async function(page){
    await fse.ensureFile(`${PUBLIC_DIR}/${page._path}`);
    await fse.writeFile(`${PUBLIC_DIR}/${page._path}`, await generateHTML(page));
  }));


  console.log('browserify and bundle JS and CSS files');
  await fse.ensureFile(PUBLIC_DIR + '/assets/bundle.js');
  await fse.ensureFile(PUBLIC_DIR + '/assets/bundle.css');
  let writeStream = fse.createWriteStream(PUBLIC_DIR + '/assets/bundle.js');
  let cssData = '';
  await new Promise(function(resolve, reject){
    let bundle = browserify()
    .add(__dirname + '/src/index.js')
    .transform(require('browserify-css'), {
      inlineImages : true,
      onFlush: function(options, done) {
        cssData += options.data;
        done(null);
      }
    })
    .bundle()
    .pipe(writeStream);

    bundle.on('close', function(){
      console.log( 'finished writing the browserify JS bundle' );
      writeStream.end();
      resolve();
    });
  });
  await fse.writeFile(PUBLIC_DIR + '/assets/bundle.css', cssData);
  console.log( 'finished writing the CSS bundle' );


  console.log('copy assets');
  let assets = glob.sync('**/*.*', { cwd : __dirname + '/_assets' });
  await Promise.all( assets.map(async function(file){

    await fse.copy(`${__dirname}/_assets/${file}`, `${PUBLIC_DIR}/assets/${file}` );
    if(file.match(/\.pdf$/)){
      try {
        let pdfContent = await extractPDFContent(`${__dirname}/_assets/${file}`);
        let pdfRows = pdfContent.split('\n').filter((r) => {
          return r.trim().length > 0;
        }).slice(0,10).map( (r) => {
          return r.replace(/\s+/g, ' ').trim();
        });
        searchables.push({
          path : '/assets/' + file, 
          title : pdfRows[0],
          description : pdfRows.slice(0,6).join(" "),
          body : pdfContent
        });
      }
      catch(e){
        console.log(e);
      }
    }
  }));

  console.log('build search index');
  let index = await buildSearchIndex(searchables);
  await fse.ensureFile(`${PUBLIC_DIR}/assets/${SEARCH_INDEX_FILE}`);
  await fse.writeFile(`${PUBLIC_DIR}/assets/${SEARCH_INDEX_FILE}`, JSON.stringify(index));

  console.log('build ready');

  return;

}




if (require.main == module) {
  let p = build();
  p.then(function () {
    console.log('ready')
  })
  .catch(function(e){
    console.log(e);
    process.exit(1);
  })
}
module.exports = build;