// Loading Data
window.addEventListener('DOMContentLoaded', () => {
  axios.get('https://crudcrud.com/api/3e1fd5f7b9ca4e7b8367cf191c20a56c/bookingLists')
    .then((res) => {
      for (let i = 0; i < res.data.length; i++)
        loadDatas(res.data[i]);
    })
    .catch((err) => {
      console.log(err);
    })
})

//Data loging fuction
function loadDatas(datas) {

  //Adding Booking Informations as a list
  //Creating New Tr
  let newTr = document.createElement('tr');


  //Creating New Td
  let lastUserIdTd = document.createElement('td');
  lastUserIdTd.style.display = 'none';


  let nameTd = document.createElement('td');
  nameTd.className = "Name"

  let emailTd = document.createElement('td');
  emailTd.className = "Email"

  let phoneTd = document.createElement('td');
  phoneTd.className = "Phone"

  let dateTd = document.createElement('td');
  dateTd.className = "Date"

  let timeTd = document.createElement('td');
  timeTd.className = "Time"

  let btnTd = document.createElement('td');


  //Appending Text
  let userId = document.createTextNode(datas._id)
  lastUserIdTd.appendChild(userId);

  let nameText = document.createTextNode(datas.name);
  nameTd.appendChild(nameText);

  let emailText = document.createTextNode(datas.email);
  emailTd.appendChild(emailText);

  let phoneText = document.createTextNode(datas.number);
  phoneTd.appendChild(phoneText);

  let dateText = document.createTextNode(datas.date);
  dateTd.appendChild(dateText);

  let timeText = document.createTextNode(datas.time);
  timeTd.appendChild(timeText);

  let editBtn = document.createElement('button');
  editBtn.className = 'btn btn-success edit';
  let editBtnText = document.createTextNode('Edit');
  editBtn.appendChild(editBtnText);
  editBtn.style.marginRight = '12px';
  btnTd.appendChild(editBtn);

  let delBtn = document.createElement('button');
  delBtn.className = 'btn btn-warning delete';
  let delBtnText = document.createTextNode('Delete');
  delBtn.appendChild(delBtnText);
  btnTd.appendChild(delBtn);


  //Appending Td into Tr
  newTr.appendChild(lastUserIdTd);
  newTr.appendChild(nameTd);
  newTr.appendChild(emailTd);
  newTr.appendChild(phoneTd);
  newTr.appendChild(dateTd);
  newTr.appendChild(timeTd);
  newTr.appendChild(btnTd);

  //Appending Tr into Tbody
  document.querySelector('#tableBody').appendChild(newTr);

}

// Adding Event Listener in Submit
let form = document.querySelector("form").addEventListener("submit", myfun);
function myfun(e) {
  e.preventDefault();
  
  // Taking The Values Of Inputs
  let inputName = document.querySelector("#name").value;
  let inputEmail = document.querySelector("#email").value;
  let inputNumber = document.querySelector("#phone").value;
  let inputDate = document.getElementById("date").value;
  let inputTime = document.getElementById("time").value;

  if (
    //Checking Inputs are Empty Or Not
    inputName === "" ||
    inputEmail === "" ||
    inputNumber === "" ||
    inputDate === "" ||
    inputTime === ""
  ) {
    alert("Please Fill All credentials");
  } else {

    //Sending The User's Data
    const networkAddress = 'https://crudcrud.com/api/3e1fd5f7b9ca4e7b8367cf191c20a56c/bookingLists';
    axios({
      method: "post",
      url: networkAddress,
      data: {
        name: inputName,
        email: inputEmail,
        number: inputNumber,
        date: inputDate,
        time: inputTime
      }
    })
      .then(res => res)
      .catch(err => console.log(err))
    location.reload();

    //Clearing The inputs
    document.querySelector("#name").value = '';
    document.querySelector("#email").value = '';
    document.querySelector("#phone").value = '';
    document.getElementById("date").value = '';
    document.getElementById("time").value = '';


    //Submit Successful Alert
    alert("Registration Done");

  }

}


let bookTable = document.querySelector('#book-table')
let tableBody = document.querySelector('#tableBody');

//Adding A evnetlinstner to edit and delete button
bookTable.addEventListener('click', removeItem);

//Removing Items
function removeItem(e) {
  //identifying which delete button
  if (e.target.classList.contains('delete')) {
    if (confirm('Are You Sure?')) {

      //deleeing data from document
      let deleteItem = e.target.parentElement.parentElement;
      let deleteId = deleteItem.firstElementChild.textContent;
      tableBody.removeChild(deleteItem);


      //delecting data from server
      let networkAddress = 'https://crudcrud.com/api/3e1fd5f7b9ca4e7b8367cf191c20a56c/bookingLists';

      let deletePath = networkAddress + '/' + deleteId
    
      axios
        .delete(deletePath)
        .then(res => res)
        .catch(err => console.log(err))
    }

  }
  else if (e.target.classList.contains('edit')) {
    if (confirm('Are You Want To Edit This Booking?')) {

      // again inisializing casue i don't know why globally inisialization is not working, dukh bhari kahani mera
      let inputName = document.querySelector(".Name").textContent;
      let inputEmail = document.querySelector(".Email").textContent;
      let inputNumber = document.querySelector(".Phone").textContent;
      let inputDate = document.querySelector(".Date").textContent;
      let inputTime = document.querySelector(".Time").textContent;

      //filling the input value with edit object's data
      document.querySelector("#name").value = inputName;
      document.querySelector("#email").value = inputEmail;
      document.querySelector("#phone").value = inputNumber;
      document.getElementById("date").value = inputDate;
      document.getElementById("time").value = inputTime;

      //deleeing data from document
      let deleteItem = e.target.parentElement.parentElement;
      let editId = deleteItem.firstElementChild.textContent;
      tableBody.removeChild(deleteItem);

      //delecting data from server
      let networkAddress = 'https://crudcrud.com/api/3e1fd5f7b9ca4e7b8367cf191c20a56c/bookingLists';
      let editPath = networkAddress + '/' + editId;
      axios.delete(editPath)
        .then(response => {
          console.log('Object successfully updated:', response.data);
        })
        .catch(error => {
          console.error('Error updating object:', error);
        });
    }
  }
}









