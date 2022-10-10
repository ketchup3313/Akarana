import React, {useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import env from "../env";

const SubmissionForm = () => {
  
  const { register, handleSubmit } = useForm();
  //use memo will be called on first page load,
  //if you haven't left the page and entered it again ,
  //this won't be triggered on reload
  //purpose: get the number of articles in db
 
  let checkDOI = (string) => {
    //Is super basic, but works, so we will stick with it for right now, the above option should be reconsidered later if they can be make to finally work.
    var basicDOIpattern = RegExp("10.(\\d{4})+/(\\S)+");

    if (basicDOIpattern.test(string)) {
      return true;
    } return true;
  };

  let checkTitle = (title) => {
    //Assuming you can't have an acedemic title that 2 or less characters. Could be approved upon in the future.
    if (!(title === "") && title.length >= 3) {
      return true;
    } else {
      return false;
    }
  };

  let checkAuthors = (authors) => {
    var regexAuthors = RegExp(
      "^[\\w'\\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$"
    );

    if (regexAuthors.test(authors)) {
      return true;
    } else {
      return false;
    }
  };

  let checkYear = (year) => {
    if (!isNaN(year)) {
      var number = Number(year);
      var yearCurrent = Number(new Date().getFullYear());

      if (number < 1900 || number > yearCurrent) {
        return false;
      } else {
        return true;
      }
    }
  };

  let checkPractice = () => {
    if (!(document.getElementById("sePractice").value === "")) {
      return true;
    } else {
      return false;
    }
  };
 

  let checkEntries = (listStr) => {
    var errorString = "";
    var isPracticeCorrect = true;

    if (!checkPractice()) {
      isPracticeCorrect = false;
    }

    if (!checkTitle(listStr["title"])) {
      errorString += "Title, ";
    }

    if (!checkAuthors(listStr["authors"])) {
      errorString += "Authors, ";
    }

    if (!checkYear(listStr["pubyear"])) {
      errorString += "Year, ";
    }

    if (!checkDOI(listStr["doi"])) {
      errorString += "Doi, ";
    }

    //if the error string is empty, then no errors have occured
    if (errorString === "" && isPracticeCorrect) {
      return true;
    }
    //if the error string isn't empty, alert the user
    else {
      if (!isPracticeCorrect && errorString === "") {
        alert("Please select a practice from the dropdown");
      } else if (!isPracticeCorrect && errorString.length >= 1) {
        alert(
          "Please select a practice from the dropdown and fix the following entries: " +
            errorString.substring(0, errorString.length - 2)
        );
      } else {
        //The substring makes sure the finaly comma and space is remove from errorString
        alert(
          "Please fix the following entries: " +
            errorString.substring(0, errorString.length - 2)
        );
      }
      return false;
    }
  };



    
    console.log("cat " + document.getElementById("sePractice"));
    const onSubmit = (data) => {
      console.log("keys = ");
    

      if (!checkEntries(data)){
        return;
      } 
    
      const articleData = {
        cat: document.getElementById("sePractice").value,
        title: data["title"],
        authors: data["authors"],
        source: data["source"],
        pubyear: data["pubyear"],
        doi: data["doi"],
        claim: data["claim"],
        evidence: data["evidence"],
        moderated:false,
        analysed:false
      };
      
      console.log("title " + data.title);
      
      axios
        .post(env.url, articleData)
        .then((res) => {
           alert("Article submitted!");
        })
        .catch((err) => {
          alert("Something bad happened, either due to article duplication in database or something else");
        });
      //posting to db
    
  };
  const fieldStrings = ["title", "authors", "source", "pubyear", "doi"];
  function highlightIfErroneous(e, idx, field){
    if (field ==="doi"){
      if (!checkDOI(e.tatget.value))
        alert("DOI is invalid");
      
    }

    if (field ==="pubyear"){
      alert("checking " + field);

      if (!checkYear(e.tatget.value))
        document.getElementById(idx).style.backgroundColor = "red";
  
    } else
      document.getElementById(idx).style.backgroundColor = "";
   
    if (e.target.value === ""){
        document.getElementById(idx).style.backgroundColor="red"
        
    } else {
        document.getElementById(idx).style.backgroundColor = "";
    }
  }
  const fields = fieldStrings.map((field, idx) => 
    
    (<p key={idx}>
      <input
        required
        id={idx}
        key={idx}
        
        onBlur={(evet) => highlightIfErroneous(evet, idx, field)}
        {...register(field)}
        placeholder={field}
        
      />
    
    </p>)
  );
  return (
    
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields}
      <select 
        defaultValue={""}
       id="sePractice" {...register("sepractice")}>
        <option value="">Select SE practice...</option>
        <option value="TDD"> TDD</option>
        <option value="Mob Programming"> Mob Programming</option>
        
      </select>
    
      <input type="submit" />
    </form>
  );

}

export default SubmissionForm;
