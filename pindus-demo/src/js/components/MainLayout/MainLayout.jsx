
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationCrosshairs, faBars, faUser, faArrowRotateRight, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons'

import Map from '../Map'
import MapToolbar from '../toolbars/MapToolbar'
import { basemapOptions } from '../Map/basemaps'

import { useEffect, useState } from 'react'

function MainLayout() {

    const [map3d, setMap3d] = useState(false)
    const [bearing, setBearing] = useState(0);

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

    function toggleBearing(val) {
        setBearing(bearing + val)
    }

    return (


        <div className='w-full h-full'>


            <MapToolbar position="top">
                <img src="https://static.wixstatic.com/media/c08bc5_6fd95856f74e43ee919e80de935e9c38~mv2.png/v1/fill/w_98,h_44,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo-green_edited.png" alt="" />


                <div className='ml-auto p-1 rounded-full bg-base-100 shadow shadow-xl'>

                    <button className='btn btn-sm  btn-ghost btn-circle border-base-200  ml-1 mr-1 tooltip tooltip-bottom' data-tip="My location" onClick={geolocate}> <FontAwesomeIcon icon={faLocationCrosshairs} /></button>

                    <button className='btn btn-sm btn-ghost btn-circle ml-1 mr-1 tooltip tooltip-bottom' data-tip="Rotate Left" onClick={() => { toggleBearing(5) }} >
                        <FontAwesomeIcon icon={faArrowRotateLeft} />
                    </button>
                    <button className='btn btn-sm btn-ghost btn-circle ml-1 mr-1 tooltip tooltip-bottom' data-tip="Rotate Left" onClick={() => { toggleBearing(-5) }} >
                        <FontAwesomeIcon icon={faArrowRotateRight} />
                    </button>

                </div>


                <div className='flex items-center content-center bg-base-100 border border-base-200 shadow shadow-lg p-1 px-2 rounded-full ml-auto prose'>
                    <h6>3D &nbsp;</h6>
                    <input type="checkbox" className="toggle toggle-sm" checked={map3d} onChange={toggleTerrain} />
                </div>
            </MapToolbar>



            <MapToolbar position="bottom">

                <select className="select select-bordered select-sm rounded-full " onChange={handleBasemap}>
                    {basemapOptions.map((basemap) => (
                        <option value={basemap.id} >{basemap.label}</option>
                    ))}
                </select>


            </MapToolbar>

            <Map terrain={map3d} basemap={basemap} bearing={bearing} />
        </div>


    )
}

export default MainLayout