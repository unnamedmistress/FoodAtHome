import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import React, { useState } from 'react';


const inter = Inter({ subsets: ['latin'] })
const [textInput, setTextInput] = useState("");
const [mealCount, setMealCount] = useState(0);
const [dietInput, setDietInput] = useState("");
const [servingCount, setServingCount] = useState(0);

export default function Home() {
  return (
     <div
style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <div
        style={{
          width: "100%",
          backgroundColor: "Coral",
          padding: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Head>
          <title>Food At Home </title>
        </Head>
        <main
          className={styles.main}
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "2%"
          }}
        >
          <div
            style={{
              marginLeft: "2%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1 style={{ textAlign: "center", fontSize:"45px"}}> 🍴   Food At Home    🍴</h1>
    <div style = {{textAlign: "center"}}>
              <textarea
              id = "textarea"
                rows="5"
                cols="40"
                name="text"
                placeholder="List the ingredients that you have. We'll assume you have staple items such as milk, eggs, and butter."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              /> <br></br>
             </div>
            
            <div
              id="form"
              style={{ backgroundColor: "Coral", display: "flex", textAlign: "center", flexDirection: "column", alignItems: "center" }}
            >
              <form
                onSubmit={onSubmit}
                style={{ backgroundColor: "Coral", display: "flex", textAlign: "center", flexDirection: "column", alignItems: "center"}}
              >
                <div style={{ display: "flex", marginTop: "1rem" }}>
                  <div style={{ padding: "2%" }}>
                    <label htmlFor="meals">How many meals?</label>
                    <input
                      type="number"
                      id="meals"
                      name="meals"
                      min="1"
                      max="10"
                      value={mealCount}
                      onChange={(e) => setMealCount(e.target.value)}
                    />
                  </div>
                 
                </div>
                <div style={{ textAlign: "center", padding: "2%" }}>
                  <label htmlFor="diet">
                  Diets/restrictions (e.g. vegan, low-carb, no peanuts)?
                  </label>
                  <br />
                  <textarea
                    id="textarea"
                    rows="2"
                    cols="15"
                    name="diet"
                    placeholder = "Enter diet restrictions, Low-Carb, Vegan, etc. or leave blank"
                    value={dietInput}
                    onChange={(e) => setDietInput(e.target.value)}
                  />
                  <br />
             <div style = {{padding: "2%"}}>
                    <label htmlFor="servings">
                      How many are hungry? (1-20)
                    </label>
                    <input
                      type="number"
                      id="servings"
                      name="servings"
                      min="1"
                      max="20"
                      value={servingCount}
                      onChange={(e) => setServingCount(e.target.value)}
                    />
                  </div>
              </div> <input type="submit" value="Show Me What I Can Eat At Home" />
              <br></br>
              <input 
                type="submit"
                value="Reset"
                onClick={() => {
                  setTextInput("");
                  setResult("");
                }}
              />
            </form></div>
          </div>
        </main>
      </div>
      <div style={{ width: "100%", backgroundColor: "#03A9F4", padding: "1rem", textAlign: "center" }}>
        {loading ? (
          <div style={{ width: "100%", backgroundColor: "#03A9F4", padding: "1rem", textAlign: "center", fontSize: "35px" }}>
           <h1>... Thinking of delicious meals 🍴</h1> 
            <h2>I'm new and a little slow this may take a few mins</h2>
          </div>
        ) : (
          <div className={styles.result}> <h1> Here is what you can make!</h1>
            {result.split("\n").map((line, index) => (
              <div key={index} style={{ marginLeft: "5%" }}>
                {line.split(" || ").map((dish, index) => (
                  <div key={index}>
                    {dish}
                    <br />
                  </div>
                ))}
              </div>
            ))}
          </div>
)}
</div>
</div>

);
}
