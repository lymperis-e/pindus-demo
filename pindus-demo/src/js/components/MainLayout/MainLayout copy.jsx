
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationCrosshairs, faBars, faUser } from '@fortawesome/free-solid-svg-icons'

import Map from '../Map'
import { useEffect, useState } from 'react'

function MainLayout() {

    const [map3d, setMap3d] = useState(false)

    const [basemap, setBasemap] = useState('bing');
    function handleBasemap(event) {
        setBasemap(event.target.value);
      }



    function geolocate() {
        document.getElementsByClassName('mapboxgl-ctrl-geolocate')[0].click()
    }
    function toggleTerrain(e) {
        setMap3d(e.target.checked)
        console.log(map3d)
    }

    return (


        <div className="drawer drawer-mobile" style={{ position: 'absolute' }}>
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col items-center justify-center">

                <label htmlFor="my-drawer-2" className="btn btn-circle  lg:hidden"
                    style={{
                        zIndex: 1000,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        margin: '10px',
                    }}>
                    <FontAwesomeIcon icon={faBars} /> </label>
                <Map terrain={map3d} basemap={basemap} />
            </div>

            <div className="drawer-side shadow shadow-lg">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

                <div className="menu p-4 w-60 bg-base-100 ">




                    <div className='h-full' style={{ display: 'flex', flexDirection: 'column' }} >

                        <label htmlFor="my-drawer-2" className="btn btn-circle btn-outline lg:hidden " style={{ alignSelf: 'end' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </label>

                        <h1 className='font-bold' style={{ marginBottom: '40px' }}>Terra Pindus</h1>


                        <ul style={{ display: 'flex', flexDirection: 'column' }}>

                            <li className='prose mt-5'>
                                <h5>
                                    Basemap
                                </h5>
                                <select className="select select-bordered w-full max-w-xs prose" onChange={handleBasemap}>
                                    <option value="bing" >   Bing</option>
                                    <option value="ktima">            Cadastre</option>
                                    <option value="esri">            ESRI</option>
                                    <option value="thunderforest">            OSM</option>
                                </select>
                            </li>


                            <div className="divider"></div>
                            <li><a onClick={geolocate}> <FontAwesomeIcon icon={faLocationCrosshairs} />My Location</a></li>

                        </ul>


                        <ul style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto' }}>

                            <li style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                
                            </li>

                            <div className="divider"></div>
                            <li><a> <FontAwesomeIcon icon={faUser} /> Είσοδος   </a></li>

                        </ul>


                    </div>




                </div>




            </div>

        </div>
    )
}

export default MainLayout