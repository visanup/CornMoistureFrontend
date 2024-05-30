import React, { useState} from 'react'
import styles from './Navbar.module.css';
import { FaBars } from 'react-icons/fa6'


function Navbar() {

    const [isToggled, setToggle] = useState(false);

    function handleToggle() {
        setToggle(!isToggled) // false + false = true
    }

    return (
      <nav className={styles.nav}>
          <div className={styles.container}>            
              <div className={styles.nav_con}>                
                  <div className={styles.logo}>
                    <h1 href="#">Moisture Sensor Online</h1>
                </div>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Inspection</a></li>
                    <li><a href="#">Login</a></li>
                </ul>
                <div className={styles.button}>
                    <a href="#">User Name</a>
                </div>
            </div>

            {/* Modile Menu */}
            <FaBars className={styles.bars} onClick={handleToggle}/>
            {isToggled ?(
                <>
                    <ul className={styles.mobile_menu}>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Inspection</a></li>
                        <li><a href="#">Login</a></li>
                    </ul>
                    <div className={styles.mobile_button}>
                        <a href="#">User Name</a>
                    </div>
                </>
            ) : null }
        </div>
    </nav>
  );
}

export default Navbar;