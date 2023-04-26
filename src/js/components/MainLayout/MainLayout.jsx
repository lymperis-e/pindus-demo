
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDrawPolygon, faLocationCrosshairs, faBars, faUser, faMagnifyingGlass, faDroplet } from '@fortawesome/free-solid-svg-icons'

import Map from '../Map'
import { useEffect, useState } from 'react'

function MainLayout() {

    const [map3d, setMap3d] = useState(false)


    function draw_polygon() {
        // Toggle drawing
        document.getElementsByClassName('mapbox-gl-draw_polygon')[0].click()
    }
    function delete_polygon() {
        document.getElementsByClassName('mapbox-gl-draw_trash')[0].click()
    }
    function geolocate() {
        document.getElementsByClassName('mapboxgl-ctrl-geolocate')[0].click()
    }
    function toggelTerrain(e){
        setMap3d(e.target.checked)
        try{
        document.getElementsByClassName('maplibregl-ctrl-terrain')[0].click()
        }catch{
        document.getElementsByClassName('maplibregl-ctrl-terrain-enabled')[0].click()
        }
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


                <Map use3d={map3d} />


            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

                <div className="menu p-4 w-60 bg-base-100 text-base-content">




                    <div className='h-full' style={{ display: 'flex', flexDirection: 'column' }} >

                        <label htmlFor="my-drawer-2" className="btn btn-circle btn-outline lg:hidden" style={{ alignSelf: 'end' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </label>

                        <h1 className='font-bold' style={{ marginBottom: '40px' }}> <FontAwesomeIcon icon={faDroplet} /> Hydra</h1>


                        <ul style={{ display: 'flex', flexDirection: 'column' }}>
                            <li><a onClick={draw_polygon}> <FontAwesomeIcon icon={faDrawPolygon} /> Select area</a></li>
                            <li><a onClick={delete_polygon}> <FontAwesomeIcon icon={faMagnifyingGlass} />Delete selection</a></li>
                            <div className="divider"></div>
                            <li><a onClick={geolocate}> <FontAwesomeIcon icon={faLocationCrosshairs} />My Location</a></li>

                        </ul>


                        <ul style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto' }}>

                            <li style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                3D  <input type="checkbox" className="toggle" checked={map3d} onChange={ toggelTerrain } />
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