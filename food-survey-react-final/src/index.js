import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";




// ---------------------------------------------------------------------------------------------------

// PLEASE VIEW ALL OF THE CODE COMMENTS AT THE BOTTOM OF THE FILE BEFORE REVIEWING THIS PROJECT

// ---------------------------------------------------------------------------------------------------






const openingMessage = "The data you provide in this form will be used in the next section, there's more to come";
var confirmationMessage;
var correctMeal;
const exampleOptions = ["Italian", "Chinese", "French", "Japanese"];
var foodStyleOptionsVis = false;






class FoodSurvey extends React.Component {
  
  constructor(props) {
    super(props);   
    this.state = {
      timerStarted: false,
      preferredFoodGroups: [],
      vegetarianLeaning: null,
      favoriteMeal: null,
      enjoysCooking: null,    
      foodBudgetAmount: null,
      lowOrHighBudget: null,
      isBelowMinimum: null,
      optionsButtonToggled: false,
      userIsConfident: null,
      favoriteStyleFood: null,
      choseFromExamples: null,
      followedInstructions: null,
      formCompleted: false
    }
    this.userDataSection = React.createRef();
  }
  
  componentDidMount() {
    setTimeout(() => alert(this.props.openingMessage), 5000);
    this.setState({timerStarted: true});
  }

  addSelectedGroups = event => {  
    if (event.target.checked) {
      this.setState({preferredFoodGroups: [...this.state.preferredFoodGroups, event.target.id]});     
    }  
    if (this.state.preferredFoodGroups.length === 3) {
    	const noMeat = !this.state.preferredFoodGroups.includes("meat");
    	const noFish = !this.state.preferredFoodGroups.includes("fish");
    	if (noMeat && noFish) {
        this.setState({vegetarianLeaning: true});
     	} else {
        this.setState({vegetarianLeaning: false});
      }  
    }
  }

  captureFavoriteMeal = (prop, event) => {
    if (event.target.value != "") {
      confirmationMessage = !prop ? `Are you sure ${event.target.value} is your absolute favorite?` : `Are you sure ${event.target.value} is your absolute favorite? Note that it should be sourced from one of the food groups you chose above (${this.state.preferredFoodGroups[0]}, ${this.state.preferredFoodGroups[1]}, ${this.state.preferredFoodGroups[2]})`;
      correctMeal = confirm(confirmationMessage);
      if (correctMeal) {
        this.setState({favoriteMeal: event.target.value});
      } else {
        this.setState({favoriteMeal: null});
      }
    }  
  }

  handleCooking = event => {
    if (event.target.checked) {
      if (event.target.value === "yes") {
        this.setState({enjoysCooking: true});
      } else {
        this.setState({enjoysCooking: false});
      }
    }  
  }

  handleBudget = (prop, event) => {
    if (event.target.value != "") {  
      if (event.target.value >= 300) {
        this.setState({
          lowOrHighBudget: "high budget",
          foodBudgetAmount: event.target.value,
          isBelowMinimum: false
        });
      } else if (event.target.value < 300 && event.target.value >= 50) {
        this.setState({
          lowOrHighBudget: "low budget",
          foodBudgetAmount: event.target.value,
          isBelowMinimum: false
        });
      } else {
        alert(`A minimum amount of ${prop} dollars is required`);
        this.setState({isBelowMinimum: true});
      }
    }  
  }

  toggleOptions = () => {
    if (!foodStyleOptionsVis) {
      this.setState({optionsButtonToggled: true});
      foodStyleOptionsVis = true;
    } else {
      this.setState({optionsButtonToggled: false});
      foodStyleOptionsVis = false;
    }
  }

  captureFavoriteStyle = event => {
    if (event.target.value != "") {  
      if (exampleOptions.includes(event.target.value)) {
        this.setState({
          favoriteStyleFood: event.target.value,
          choseFromExamples: true
        });
      } else {
        this.setState({
          favoriteStyleFood: event.target.value,
          choseFromExamples: false
        });
      }
      if (event.target.value.indexOf(" ") != -1) {
        this.setState({followedInstructions: false});
      } else {
        this.setState({followedInstructions: true});
      }
      if (!this.state.optionsButtonToggled) {
        this.setState({userIsConfident: true});
      } else {
        this.setState({userIsConfident: false});
      }
    }  
  }

  handleCompletion = () => this.setState({formCompleted: true});
    

  render() {
    const defaultFoodGroups = ["meat", "fish", "fruit", "vegetables", "nuts"];
    
    
    return (
      <div>
        <form id="initial-info-form">
          {<ChosenFoodGroups 
            addSelectedGroups={this.addSelectedGroups}
            needsThreeGroups={true}
            defaultFoodGroups={defaultFoodGroups}
            preferredFoodGroups={this.state.preferredFoodGroups}
            veg={this.state.vegetarianLeaning}
          />}
          <div id="questions-2-5">
            {<FavMeal 
              captureFavoriteMeal={this.captureFavoriteMeal}
              sourcedFromGroups={true}
              favoriteMeal={this.state.favoriteMeal}
              preferredFoodGroups={this.state.preferredFoodGroups}
            />}
            {<Cooking 
              handleCooking={this.handleCooking}
              likesCooking={this.state.enjoysCooking}
              radioBtnArray={["yes", "no"]}
            />}
            {<GroceriesBudget
              handleBudget={this.handleBudget}
              timeIntervalQuerying="weekly"
              foodBudgetAmount={this.state.foodBudgetAmount}
              lowOrHighBudget={this.state.lowOrHighBudget}
              minimumAmount={50}
              isBelowMinimum={this.state.isBelowMinimum}
              canProvideRange={false}
            />}
            {<PreferredStyle
              toggleOptions={this.toggleOptions}
              captureFavoriteStyle={this.captureFavoriteStyle}
              handleCompletion={this.handleCompletion}
              optionsButtonToggled={this.state.optionsButtonToggled} 
              favoriteStyleFood={this.state.favoriteStyleFood}
              exampleOptions={exampleOptions}
              choseFromExamples={this.state.choseFromExamples}
              numOfStylesAllowed={1}
              invalidMsg="Only 1 option permitted"
              followedInstructions={this.state.followedInstructions}
            />}
          </div>
        </form>     
        {this.state.formCompleted ? 
        <DisplayUserData
         userDataSection={this.userDataSection}
         preferredFoodGroups={this.state.preferredFoodGroups}
         veg={this.state.vegetarianLeaning}
         favoriteMeal={this.state.favoriteMeal}
         authorsFavoriteMeal="Hibachi chicken"
         likesCooking={this.state.enjoysCooking}
         timeIntervalQuerying="weekly"
         foodBudgetAmount={this.state.foodBudgetAmount}
         lowOrHighBudget={this.state.lowOrHighBudget}
         favoriteStyleFood={this.state.favoriteStyleFood}
         optionsButtonToggled={this.state.optionsButtonToggled}
         userIsConfident={this.state.userIsConfident}
         choseFromExamples={this.state.choseFromExamples}
         numOfStylesAllowed={1}
         followedInstructions={this.state.followedInstructions}
        /> : null}
      </div>
    );
  }
}


class ChosenFoodGroups extends React.Component {  
    
  render() {    
    return (
      <div>
        <h1 style={{textAlign: "center", fontSize: "2.5rem"}}>Food Survey and Experience</h1>        
        <h2 style={{textDecoration: "underline"}}>User Info:</h2>
        <fieldset style={{marginBottom: 20}} id="food-groups">
          <legend style={{marginTop: 10, marginBottom: 10}}>Please select your favorite food groups {this.props.needsThreeGroups ? "(choose 3 groups)" : "(any amount)"}</legend>
          {this.props.defaultFoodGroups.map((food, index) => (
            <>
              <input 
                type="checkbox"
                onClick={this.props.addSelectedGroups} 
                key={`group-${index + 1}`} 
                name={food} 
                id={food} 
              />       
              <label 
                htmlFor={food} 
                style={{textTransform: "capitalize"}}
                key={`check-label-${index + 1}`}
              >
                {food}
              </label> {index != 4 ? <br /> : ""}
            </>
          ))}
        </fieldset>          
      </div>
    );
  }
}




class FavMeal extends React.Component {

  render() {
    return (
      <div id="fav-meal">
        <label 
          htmlFor="fav-food" 
          style={{marginLeft: 0}}
        >
          What's your favorite food/meal?
        </label>
        <input 
          type="text" 
          onBlur={event => this.props.captureFavoriteMeal(this.props.sourcedFromGroups, event)}
          className={correctMeal === null ? "incorrect-meal" : ""}
          name="fav-food" 
          id="fav-food"
        />
      </div>
    );
  }  
}



class Cooking extends React.Component {
  
  render() {    
    return (
      <div id="cooking">
        <p style={{marginBottom: 10}}>Do you enjoy cooking?</p>
        {this.props.radioBtnArray.map((el, index) => (
          <>
            <input 
              type="radio"
              onClick={this.props.handleCooking}
              value={el}
              name="enjoys-cooking"      
              id={`${el}-btn`}
              key={`radio-${index + 1}`}
            />
            <label 
              htmlFor={`${el}-btn`}
              className="cap"
              style={index === 0 ? {marginBottom: 0} : null}            
              key={`radio-label-${index + 1}`}
            >
              {el}
            </label> {index === 0 ? <br /> : ""}            
          </>
        ))}       
      </div>
    );
  }
}



class GroceriesBudget extends React.Component {
   
  render() {       
    const timeInterval = this.props.timeIntervalQuerying;       
    return (
      <div id="budget">
        <label htmlFor={`${timeInterval}-budget`}>
          {timeInterval === "monthly" ? "Monthly" : "Weekly"} budget for groceries? {this.props.canProvideRange ? "(range allowed)" : "(no ranges allowed)"}
        </label>
        <input 
          type="number"
          onBlur={event => this.props.handleBudget(this.props.minimumAmount, event)}
          className={this.props.isBelowMinimum != null && this.props.isBelowMinimum ? "invalid-input" : ""}
          name={`${timeInterval}-budget`} 
          id={`${timeInterval}-budget`}
          step={timeInterval === "monthly" ? 100 : 30}
        />
      </div>
    );
  }
}


class PreferredStyle extends React.Component {

  componentDidUpdate(prevProps) {
    if (this.props.followedInstructions !== prevProps.followedInstructions) {
      if (!this.props.followedInstructions) {
        alert(this.props.invalidMsg);
      }
    }    
  }

  render() {
    const btnToggled = this.props.optionsButtonToggled;
    const [italian, chinese, french, japanese] = this.props.exampleOptions;
    const moreThanOneStyle = typeof this.props.favoriteStyleFood === "string" && !this.props.followedInstructions;

    return (
      <div id="fav-style">
        <label htmlFor="fav-style-food">
          Favorite style of food? Only {this.props.numOfStylesAllowed} allowed
        </label>
        <input
          type="text" 
          onBlur={this.props.captureFavoriteStyle}
          className={moreThanOneStyle ? "invalid-input" : ""}
          name="fav-style-food"
          id="fav-style-food"
        />
        <button 
          type="button" 
          onClick={this.props.toggleOptions}
          style={{cursor: "pointer", marginLeft: 10}}
        >       
          {!btnToggled ? "See options" : "Hide options"}
        </button>
        <span id="style-options-list" className={!btnToggled ? "options-invisible" : ""}>                     
          {`${italian}, ${chinese}, ${french}, ${japanese}`}
        </span>        
        <button 
          id="form-completed-btn"
          type="button"
          onClick={this.props.handleCompletion}                     
        >
          View your input data
        </button>
        
      </div>
    );
  } 
}



class DisplayUserData extends React.Component {

  componentDidMount() {
    var sectionElTopOffset = this.props.userDataSection.current.getBoundingClientRect().top;
    window.scrollTo(0, sectionElTopOffset - 30);
  }

  render() {
    
    const [group1, group2, group3] = this.props.preferredFoodGroups;

    const healthMessage = !this.props.preferredFoodGroups.includes("meat") ? "You've chosen some of the healthiest food group options" : "Since meat was one of your chosen food groups, your selected food groups are potentially slightly less healthy";

    const vegOptionsArray = ["chickpeas", "peanut butter", "almond milk", "lentils"];

    const vegMessage = `It appears as though you have more of a preference towards vegetarian diet. Some great vegetarian friendly foods include: ${vegOptionsArray[0]}, ${vegOptionsArray[1]}, and ${vegOptionsArray[2]}`;

    const popularFoodsArray = ["grilled chicken", "hamburgers", "salmon", "grapes", "romaine lettuce", "almonds"];

    const hasSameFavorite = this.props.authorsFavoriteMeal === this.props.favoriteMeal ? "You share the same favorite food as the author!" : `Your taste buds differ from the author, ${this.props.favoriteMeal} is not my favorite`;
  

    var recipeOptions = {
      meat: "Kansas City barbecue chicken",
      fish: "teriyaki salmon",
      fruit: "dried mango",
      vegetables: "fried and breaded zucchini",
      nuts: "chocolate covered almonds"
    };

    const dislikesCooking = `You don't like to cook, but you at least like to cook your favorite meal of ${this.props.favoriteMeal}, right?`;
    const enjoysCooking = "Since you like to cook, maybe consider becoming a chef?";
    const dislikesCooking2 = "Cooking can be tedious and very time intensive, disliking cooking is completely understandable";
    const enjoysCooking2 = `If you like to cook, some good recipe options from your desired food groups are: ${recipeOptions[this.props.preferredFoodGroups[0]]}, ${recipeOptions[this.props.preferredFoodGroups[1]]}, and ${recipeOptions[this.props.preferredFoodGroups[2]]}`;

    const averageAmericanBudget = 250;
    const highBudgetMessage = `Since you have a ${this.props.lowOrHighBudget}, you have more flexibility in terms of what you can buy. Also, you have the ability to shop at some of the more premium stores, such as Whole Foods and your local gourmet markets`;
    const lowBudgetMessage = `Even if you have a ${this.props.lowOrHighBudget}, you still have access to a lot of quality food from grocery stores like Trader Joe's and Acme`;

    const confidentMessage = `You clearly are confident in choosing ${this.props.favoriteStyleFood} because you didn't even need to view any of the example options`;
    const lackConfidenceMsg = `You chose to look at the example options before choosing ${this.props.favoriteStyleFood}, which leads me to believe you don't necessarily have a clear favorite`;

    const prefersCrowdFavorite = "Your favorite style of food was selected from the list of common example options, so you have a liking for the crowd favorites";
    const uniqueTasteBuds = "You didn't choose from the common example options, so maybe it's fair to say you prefer more unique type of dishes";

    const instructionsSuccess = `You are an attentive user who follows instructions, you only included ${this.props.numOfStylesAllowed} food type`;
    const instructionsFailure = `No disrespect but you were a bit hasty, you did not initially take note of the instructions to only include ${this.props.numOfStylesAllowed} food type`;
  


    return (
      <section 
        id="display-user-data" 
        style={{marginTop: 150}} 
        ref={this.props.userDataSection}
      >
        <h2 style={{textDecoration: "underline", marginBottom: 25}}>User Data:</h2>
        <h3>Preferred Food Groups</h3>
        <ul id="chosen-foods-component">
          <li>{`You chose ${group1}, ${group2}, and ${group3} as your preferred food groups`}</li>
          <li>{`${group1} must be your go to food group since you selected it first`}</li>
          <li>{healthMessage}</li>
          {this.props.veg ? <li>{vegMessage}</li> : null} 
        </ul>
        <h3>Favorite Meal</h3>
        <ul id="fav-meal-component">
          <li>{`Your favorite meal was ${this.props.favoriteMeal}`}</li>
          <li>{popularFoodsArray.includes(this.props.favoriteMeal) ? `${this.props.favoriteMeal} happens to be a popular choice` : `You are a little bit different than most, ${this.props.favoriteMeal} is more of an uncommon favorite`}</li>
          <li>{hasSameFavorite}</li>
        </ul>
        <h3>Cooking Preferences</h3>
        <ul id="cooking-component">
          <li>{!this.props.likesCooking ? dislikesCooking : enjoysCooking}</li>
          <li>{!this.props.likesCooking ? dislikesCooking2 : enjoysCooking2}</li>
        </ul>
        <h3>Groceries Budget</h3>
        <ul id="groceries-budget-component">
          <li>{`Your ${this.props.timeIntervalQuerying} budget amount was ${this.props.foodBudgetAmount}`}</li>
          <li>{this.props.foodBudgetAmount > averageAmericanBudget ? "You have a higher than average grocery budget" : "Your grocery budget is less than the average amount"}</li>
          <li>{this.props.lowOrHighBudget === "high budget" ? highBudgetMessage : lowBudgetMessage}</li>
        </ul>
        <h3>Preferred Food Style</h3>
        <ul id="preferred-style-component">
          <li>{`You selected ${this.props.favoriteStyleFood} as your favorite style of food`}</li>
          <li>{this.props.userIsConfident ? confidentMessage : lackConfidenceMsg}</li>
          <li>{this.props.choseFromExamples ? prefersCrowdFavorite : uniqueTasteBuds}</li>
          <li>{this.props.followedInstructions ? instructionsSuccess : instructionsFailure}</li>
        </ul>     
      </section>
    );
  } 
}



ReactDOM.render(<FoodSurvey openingMessage={openingMessage}/>, document.getElementById("application"));





/* Please open the project in a new tab by clicking on the "open in new window" button in the top right corner */
/* This project only has logic for a users initial input, it's not designed to have/accept additional inputs from the user after the initial one. Yes, I know that you would need that additional logic in the real world but this was not a production webpage/project, so I placed more of an emphasis on just focusing on using React. The project still shows proficiency with React's core fundamentals without that additional logic */
/* I'm pretty sure the 2 warnings listed in the console for this project are erroneous. I have key attributes in both of the components that stackblitz claims doesn't have them */
/* Once again, this was not a production webpage/project, so the CSS and responsiveness was not prioritized. I built this project to show usage/competency with React, so I focused much more so on the React code versus the CSS code. Please do not evaluate my CSS capabilities based on the CSS you see in this project. If you would like to see my CSS capabilities, please view my "blueberry practice project" on the Repl platform (which is in the "featured" section of my LinkedIn profile) */
/* I only got a minor amount of help on this food survey & experience project here and I basically built the React carousel project entirely on my own */
/* I know that onBlur event is a little bit of a hack here but the issue is onChange event fires after every keystroke in some browsers which is not what I wanted, onBlur event works better here */
/* I know that inline styles are frowned upon and are not performant but I was just using them in this project to show usage of different parts of the JSX syntax */
 
 
 
 
/* INSTRUCTIONS:  how to go through the form and complete it as a user */
 
/*  NOTE: when you try out all of these input options that I list below for each of the form questions, you need to refresh the page and start over each time you fill out the form in a new way */
/*  for the first question where you select your preferred food groups, check 3 boxes and don't edit your choices. Also, try only checking the vegan food groups versus checking off a food group that is non-vegan */
/* for the second question where you are asked your favorite food/meal, try 3 separate things. 1) try adding "Hibachi chicken" as your input   2) try entering a food from the "popularFoodsArray" (popularFoodsArray is in the DisplayUserData component)    3) try writing in a food that is NOT sourced from the 3 food groups you chose from the first question */
/*  for the third question where you are asked if you like cooking or not, try both the yes and no options separately and see how the data response differs */
/* for the fourth question where you are asked your weekly groceries budget, try out a couple different things:  1) enter a value of 300 or greater   2) enter a value greater than 250   3) enter a value that is less than 300 but at least 50   4) enter a value that is below 50 */
/* for the final question where you're asked your favorite style of food, here are the things you can try:  1) enter in 2 food groups or more    2) notice the difference in the data output when you click the "see options" button versus not    3) pick one of the example options provided by the button as your favorite style of food (versus not) */
































