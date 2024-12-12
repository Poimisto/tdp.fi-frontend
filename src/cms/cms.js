import CMS from "netlify-cms-app"
import ctaEditor from "./editor-components/ctaEditor"
import heroBlock from "./editor-components/heroBlockEditor"
import latestPosts from "./editor-components/latestPostsEditor"
import cardsEditor from "./editor-components/cardsEditor"
import newsletterFormEditor from "./editor-components/newsletterFormEditor"
import displayVariableEditor from "./editor-components/displayVariableEditor"
import variableSelect from "./editor-widgets/variableSelect"
import PreviewTemplate from "./preview-templates/page"
CMS.registerPreviewStyle("/admin/editor-style.css")

CMS.registerWidget(
  "variableSelect",
  variableSelect,
  CMS.getWidget("select").preview
)

CMS.registerEditorComponent(heroBlock)
CMS.registerEditorComponent(ctaEditor)
CMS.registerEditorComponent(latestPosts)
CMS.registerEditorComponent(cardsEditor)
CMS.registerEditorComponent(newsletterFormEditor)
CMS.registerEditorComponent(displayVariableEditor)

CMS.registerPreviewTemplate("pages", PreviewTemplate)
