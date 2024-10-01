import { useState } from "react";
import { StructureTextarea } from "../../component/Textarea";

const Translator = () => {
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");

  const handleTranslate = () => {
    // In a real application, this would call a translation API
    setTargetText(`Translated: ${sourceText}`);
  };
  return (
    <div className="app">
      {/* <header> */}
      {/*   <h1>Translator</h1> */}
      {/* </header> */}
      {/* <main> */}
      {/*   <div className="language-select"> */}
      {/*     <select */}
      {/*       value={sourceLanguage} */}
      {/*       onChange={(e) => setSourceLanguage(e.target.value)} */}
      {/*     > */}
      {/*       <option value="en">English</option> */}
      {/*       <option value="es">Spanish</option> */}
      {/*       <option value="fr">French</option> */}
      {/*     </select> */}
      {/*     <button */}
      {/*       onClick={() => { */}
      {/*         const temp = sourceLanguage; */}
      {/*         setSourceLanguage(targetLanguage); */}
      {/*         setTargetLanguage(temp); */}
      {/*       }} */}
      {/*     > */}
      {/*       ⇄ */}
      {/*     </button> */}
      {/*     <select */}
      {/*       value={targetLanguage} */}
      {/*       onChange={(e) => setTargetLanguage(e.target.value)} */}
      {/*     > */}
      {/*       <option value="en">English</option> */}
      {/*       <option value="es">Spanish</option> */}
      {/*       <option value="fr">French</option> */}
      {/*     </select> */}
      {/*   </div> */}
      {/*   <div className="translation-area"> */}
      {/*     <textarea */}
      {/*       value={sourceText} */}
      {/*       onChange={(e) => setSourceText(e.target.value)} */}
      {/*       placeholder="Enter text to translate" */}
      {/*     /> */}
      {/*     <textarea */}
      {/*       value={targetText} */}
      {/*       readOnly */}
      {/*       placeholder="Translation will appear here" */}
      {/*     /> */}
      {/*   </div> */}
      {/*   <button onClick={handleTranslate} className="translate-button"> */}
      {/*     Translate */}
      {/*   </button> */}
      {/* </main> */}

      <div className="flex">
        <div className="w-6/12">
          <div className="w-full">
            <StructureTextarea />
          </div>
        </div>
        <StructureTextarea />
      </div>
    </div>
  );
};

export default Translator;
