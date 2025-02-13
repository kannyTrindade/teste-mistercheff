import { useState } from "react";


export default function UploadButton() {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };  

  return (
    <div className="upload-container">
      <label htmlFor="file-upload" className="upload-button">
        <span className="spanLb">Logo</span>
        <span className={"spanClick " + (fileName ? 'hidden' : '')}>Selecionar arquivo</span>
      </label>
      <input id="file-upload" type="file" className="hidden-input" onChange={handleFileChange} />
      {fileName && <p className="file-name">{fileName}</p>}
    </div>
  );
}
