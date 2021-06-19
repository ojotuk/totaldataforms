import React, {  useState,useContext } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./PdfViewer.css";
import {GlobalContext} from './../../../GlobalStore/GlobalProvider'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({ pdf }) => {
  const state = useContext(GlobalContext);
  const {user,tab, ChangeTab} = state;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const nextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  const prev=(e)=>{
    e.preventDefault()
  }
  // device width
  const [width,setWidth] = useState(window.innerWidth < 600 ? window.innerHeight - 300 : 900)
  window.addEventListener('resize',(e)=>{
    console.log(window.innerWidth / 2);
    setWidth(window.innerWidth)
  })

  // })

  return (
    <div className='container'>
       <div className="controls" >
        <div>
        <button className='btn mr-2 btn-prev'
         onClick={prevPage} disabled={pageNumber === 1}>
          Prev
        </button>
        <button className={pageNumber===numPages ? 'd-none ' : 'btn btn-nxt'} onClick={nextPage} disabled={pageNumber === numPages}>
          Next
        </button>
        <button className={pageNumber!==numPages ? 'd-none ' : 'btn btn-nxt'} onClick={()=>ChangeTab(2)} >
          Sign form
        </button>
        </div>
        <div>
        Page {pageNumber} of {numPages}
        </div>
      </div>
      <Document
        file={pdf}
        onLoadSuccess={onDocumentLoadSuccess}
        onContextMenu={(e) => prev(e)}
        className="pdf-container"
      >
        <Page pageNumber={pageNumber} 
        width={`${Number(width)/1.2}`}
        // width='600'
        className='pages' />
      </Document>
      <div className="controls" >
        <div>
        {/* <button className={pageNumber!==numPages ? 'd-none ' : 'btn btn-nxt'}  onClick={()=>ChangeTab(2)}>
          Sign form
        </button> */}
        </div>
        <div>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
