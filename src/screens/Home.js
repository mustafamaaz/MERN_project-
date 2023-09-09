import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
// import Card from '../componenet/Card'


export default function Home() {

  const [search, setSearch] = useState("");
  const [foodcat, setfoodcat] = useState([]);
  const [fooditems, setfooditems] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:4000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    // console.log(response[0],response[1]);

    setfooditems(response[0]);
    setfoodcat(response[1]);

  }

  useEffect(() => {
    loadData()
  }, [])  // ,[] ka mtlb hy ky jessai application open ho jitny bh function useefect me hy call hojaey



  return (
    <div>

      <div> <Navbar /> </div>

      {/* crousel */}

      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }} >
          <div className="carousel-inner" id='carousal'>

            <div className='carousel-caption' style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"  value={search} onChange={(e)=>{setSearch(e.target.value)}} />
              </div>
            </div>


            <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/200×120/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/200×120/?BBQ" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/200×120/?pizza" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>


      <div className='container m-3 '>
        {
          foodcat !== [] ? foodcat.map((data) => {

            return (

              <div className='row mb-3' >

                <div key={data._id} className='fs-3 m-3' >
                  {data.CategoryName}
                </div>
                <hr />

                {fooditems !== [] ?
                  fooditems.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                    .map(filterItems => {
                      return (
                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3' >
                          <Card    foodItem={filterItems}
                            // foodName = {filterItems.name}  //props sending to card
                            options={filterItems.options[0]}   // because database having option [0]
                          // imgscr = {filterItems.img} 
                          >
                          </Card>
                        </div>
                      )
                    }) : "fooditem not persent"
                }

              </div>
            )


          }) : "food category not present"

        }


      </div>
      <div> <Footer /> </div>

    </div>
  )
}
