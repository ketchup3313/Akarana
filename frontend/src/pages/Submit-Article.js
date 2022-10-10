import React from "react";
import SubmissionForm from "../components/SubmissionForm.js";
import {Component} from "react";
import axios from "axios";

class SubmitArticle extends Component{
  constructor(){
    super();
    window.onbeforeunload = (event) => {
      const e = event || window.event;
      // Cancel the event
      e.preventDefault();
      if (e) {
        e.returnValue = ""; // Legacy method for cross browser support
      }
      return ""; // Legacy method for cross browser support
    };
  }
  render(){
    
    return (
    <div>
      <h2>Submit Article</h2>
      <p>
        Please submit your article here.
      </p>
      
      <SubmissionForm/>
    </div>
  );
    }
};

export default SubmitArticle;
