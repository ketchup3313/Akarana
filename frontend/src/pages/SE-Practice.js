import React, { Component } from "react";
import Styles from "../components/tablestyle.js";
import Table from "../components/evidencetable.js";
import axios from "axios";
import Dropdown from "../components/Dropdown.js";
import env from "../env";
import SEPractices from "../dummydata/SEPractices";

const optionItems = SEPractices.map((SEPractice) => (
  <option key={SEPractice.practice}>{SEPractice.practice}</option>
));

const columns =[
 {

    Header: "Title",
    accessor: "title",
    sortType: "alphanumeric",
  },
  {
    Header: "Authors",
    accessor: "authors",
    sortType: "alphanumeric",
  },
  {
    Header: "Source",
    accessor: "source",
    sortType: "alphanumeric",
  },
  {
    Header: "Pub. Year",
    accessor: "pubyear",
    sortType: "alphanumeric",
  },
  {
    Header: "DOI",
    accessor: "doi",
    sortType: "alphanumeric",
  },
  ,
  {
    Header: "Claimed Benefit",
    accessor: "claim",
    sortType: "alphanumeric",
  },
  {
    Header: "Level of Evidence",
    accessor: "evidence",
    sortType: "alphanumeric",
  },
]

//this is the SE table page
class SEPractice extends Component {

    state = {
        //current articles filtered by se practice
        //all articles in db
        allArticles:[],
        articlesToDisplay:[],
        text:"",

    }
    
    //called every time this page is loaded.
    componentDidMount(){
      
      
      axios.get(env.url).then(res => {
        console.log(res.data);
         
        this.setState({
          allArticles: res.data.filter(
            (item) => item["moderated"] && item["analysed"]
          ),
        });
        console.log(this.state.allArticles);
      
        console.warn("got all arts");
      }).catch((e)=> console.log("no articles found"));
    }

    handleChange = (e) =>{
          console.log("cat select " + e.target.value);
    
        if (e.target.value===""){
              this.setState({ articlesToDisplay:this.state.allArticles, text:"Select an SE Practice from dropdown"});
        } else {
          let temp =  this.state.allArticles.filter(
            (item) => item["cat"].toLowerCase() === e.target.value.toLowerCase()
          );
          this.setState({articlesToDisplay:temp, text:""});
        }

      }
   
   //set state will automatically render the whole page
    
    

    
    
    render() {
      //alert(this.props.data);

      if (this.props.data === undefined){
          return (
            <div>
              <Styles>
                <Dropdown
                  title="Select an SE practice"
                  optionItems={optionItems}
                  handleChange={this.handleChange}
                />
                <Table data={this.state.articlesToDisplay} columns={columns} />
              </Styles>
            </div>
          );
      } else{
        return (
          <div>
            <h2>Select from Queue</h2>
            <Styles>
              <Table key={this.props.data} data={this.props.data} columns={this.props.columns} />
            </Styles>
          </div>
        );
      }
    }
    
}


export default SEPractice;
