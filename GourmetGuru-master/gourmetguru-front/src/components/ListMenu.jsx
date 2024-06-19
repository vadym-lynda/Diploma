function ListMenu(params) {
  return(
  <div className="menu">
    <div className="list-menu">
        <form action="" className="check-form">
            <ul>

        <div className="check-country">
            <li><h3>Відбір за країною</h3></li>
            <li><input type="checkbox" name="" id=""/>
           <label for="">Українська</label></li>
            <li><input type="checkbox" name="" id=""/>
           <label for="">Італійська</label></li>
            <li><input type="checkbox" name="" id=""/>
           <label for="">Іспанська</label></li>
           <li> <input type="checkbox" name="" id=""/>
             <label for="">Французька</label></li>
            <li><input type="checkbox" name="" id=""/>
           <label for="">Японська</label></li>
            </div>
          
           <div className="check-type">
            <li> <h3>Відбір за типом</h3></li>
            <li>    <input type="checkbox" name="" id=""/>
              <label for="">Перші страви</label></li>
            <li>    <input type="checkbox" name="" id=""/>
               <label for="">Другі страви</label></li>
            <li>    <input type="checkbox" name="" id=""/>
                <label for="">Гарніри</label></li>
            <li>    <input type="checkbox" name="" id=""/>
                <label for="">Салати</label></li>
            </div>
        
            <div className=" check-difficulty">
                <li> <h3>Відбір за складністю</h3></li>
            <li>    <input type="checkbox" name="" id=""/>
                <label for="">Легка</label></li>
            <li>    <input type="checkbox" name="" id=""/>
              <label for="">Середня</label></li>
            <li>    <input type="checkbox" name="" id=""/>
             <label for="">Складна</label></li>
            <li>    <input type="checkbox" name="" id=""/>
              <label for="">Дуже складна</label></li>
            </div>
        </ul>
        <button className="card-btn check-form-btn">Пошук</button>
        </form>
    </div>
</div>)
}

export default ListMenu;