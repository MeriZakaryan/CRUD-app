let inputs = Array.from(document.querySelectorAll('.inp'))
let btn = document.querySelector('#btn')
let table = document.querySelector('#info-bar')
let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []

function inputChange(){
    for(let input of inputs){
        input.addEventListener('focus', function(event){
            if (!event.target.value){
                event.target.closest('.group').firstElementChild.classList.add('float')
                event.target.setAttribute('placeholder', `Enter ${event.target.previousElementSibling.innerText}`)
            }
        })

    }
}

inputChange()

function collectInfo(event){  
    event.preventDefault()
    let check = inputs.every(inp => inp.value.trim())
    let massege = document.querySelector('#massege')
    if(check){
        students.push({name: inputs[0].value, surname: inputs[1].value, code: inputs[2].value, id: Date.now()})
        massege.style.display = 'none'
        inputs.forEach(inp => {
            inp.value = ''
            inp.closest('.group').firstElementChild.classList.remove('float')
            inp.removeAttribute('placeholder')
            }
        )
        
    }else massege.style.display = 'flex'
    
    localStorage.setItem('students', JSON.stringify(students)) 
    render(students)
}


function render(data){
    document.querySelector('tbody').innerHTML = ''
    for(let el of data){
        let tr = document.createElement('tr')
        for(let key in el){
            let td = document.createElement('td')
            tr.appendChild(td)
            td.innerText = el[key]
            
            if(key === 'id'){
                tr.setAttribute('id', el[key])
                td.innerHTML = `
                    <button class="edit" onclick='editAcc(event)'>Edit</button>
                    <button class="remove" onclick='removeAcc(event)'>Delete</button>
                `  
            }
        }

    document.querySelector('tbody').appendChild(tr)
    }

}

function editAcc(event){
    let row = event.target.parentNode.parentNode
    for(let i = 0; i < inputs.length; i++){
        if (!inputs[i].value){
            inputs[i].closest('.group').firstElementChild.classList.add('float')
            inputs[i].setAttribute('placeholder', `Enter ${inputs[i].previousElementSibling.innerText}`)
        }
        inputs[i].value = row.children[i].innerText       
    }

    students = students.filter(el => +el.id !== +row.id)
    localStorage.setItem('students', JSON.stringify(students)) 
}

function removeAcc(event){
    let row = event.target.parentNode.parentNode
    document.querySelector('#confirmation').style.marginTop = '0px'
    document.querySelector('#btn-bar').style.display = 'flex'
    console.log(row);
    for(let btn of document.querySelector('#btn-bar').children){
        btn.onclick = function(event){
            if(event.target.innerText === 'Delete'){
                document.querySelector('#confirmation').style.marginTop = '-100px'
                document.querySelector('#confirmation p').innerText = 'This card has been deleted successfully.'
                document.querySelector('#btn-bar').style.display = 'none'

                students = students.filter(el => +el.id !== +row.id) 
                localStorage.setItem('students', JSON.stringify(students)) 
                render(students)

                document.querySelector('#confirmation').style.marginTop = '0px'
                setTimeout(()=>document.querySelector('#confirmation').style.marginTop = '-100px', 1000)
            } else document.querySelector('#confirmation').style.marginTop = '-100px'        
        }
    }
}

   
document.addEventListener('DOMContentLoaded', () => render(students))