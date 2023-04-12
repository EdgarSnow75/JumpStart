import JumpStart from "/src/Images/HeaderAndFooter/JumpStart.png"

const Header = (props) => { 
    return(
        <div className="navbar w-screen bg-primary sticky top-0 pe-10 text-white">
            
            <div className="flex-1">
            <a className="btn btn-ghost w-40  items-center"><img src={JumpStart} /></a>  
            </div>
            
            <div className="form-control start-2 m-2 ">
            
                        <input type="text" placeholder="Search" className="input text-black" />
                       
            </div>
            <button class="bg-secondary hover:bg-orange-700  ">
                Search 
            </button>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-1">
                    <li><a>Find a Store</a></li>
                    <li tabIndex={0}>
                        <a>
                            Categories
                            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                        </a>
                        <ul className="p-2 bg-base-100">
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                    </li>
                    <li><a>Orders</a></li>
                    <li><a>Customer Service</a></li>   
                </ul>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                    <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    <span className="badge badge-sm indicator-item">8</span>
                </div>
                </label>
            
              
                <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                

                    <div className="card-body">
                        <span className="font-bold text-lg">8 Items</span>
                        <span className="text-info">Subtotal: $999</span>
                    <div className="card-actions">
                        <button className="btn btn-secondary btn-block">View cart</button>
                    </div>
                    </div>
                </div>
                </div>
                <button class="bg-secondary hover:bg-orange-700 mx-1  ">
                Login 
                </button>
                <button class="bg-secondary hover:bg-orange-700 mx-1 ">
                Register 
                </button>
            </div>
        </div>
    )


}

export default Header