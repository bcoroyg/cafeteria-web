const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carritoCompra = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()

    if(localStorage.getItem('carritoCompra')){
        carritoCompra = JSON.parse(localStorage.getItem('carritoCompra'))
        pintarCarrito()
    }
});

cards.addEventListener('click', e => {
    addCarrito(e)
})

items.addEventListener('click', e =>{
    btnAccion(e)
})

const fetchData = async () => {
    try {
        const res = await fetch('datos');
        const data = await res.json();
        /* console.log(data); */
        pintarCards(data)
    } catch (error) {
        console.log(error)
    }
}

const pintarCards = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.title
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('img').setAttribute("src", producto.thumbnailUrl)
        templateCard.querySelector('.btn-dark').dataset.id = producto.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })   
    cards.appendChild(fragment)
}

const addCarrito = e => {
/*     console.log(e.target)
    console.log(e.target.classList.contains('btn-dark')) */
    if(e.target.classList.contains('btn-dark')){
       // console.log(e.target.parentElement)
       setCarrito(e.target.parentElement)
    }

    e.stopPropagation()
}

const setCarrito = objeto => {
    //console.log(objeto)

    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }

    if(carritoCompra.hasOwnProperty(producto.id)){
        producto.cantidad = carritoCompra[producto.id].cantidad + 1
    }
    carritoCompra[producto.id] = {...producto}
    pintarCarrito()
}

const pintarCarrito = () =>{

    items.innerHTML = ''
    Object.values(carritoCompra).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
    pintarFooter()

    localStorage.setItem('carritoCompra', JSON.stringify(carritoCompra))
}

const pintarFooter = () => {
    footer.innerHTML = ''
    if(Object.keys(carritoCompra).length === 0){
        footer.innerHTML = '<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>'
        return 
    }

    const nCantidad = Object.values(carritoCompra).reduce((acc, {cantidad}) => acc + cantidad, 0)
    const nPrecio = Object.values(carritoCompra).reduce((acc, {cantidad, precio}) => acc + cantidad *precio, 0)
    
    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carritoCompra = {}
        pintarCarrito()

    })
}

const btnAccion = e =>{
/*     console.log(e.target) */

    if(e.target.classList.contains('btn-info')){
        const producto = carritoCompra[e.target.dataset.id]
        producto.cantidad++
        carritoCompra[e.target.dataset.id] = {...producto}
        pintarCarrito()
    }

    if(e.target.classList.contains('btn-danger')){
        const producto = carritoCompra[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad === 0){
            delete carritoCompra[e.target.dataset.id]
        }
        pintarCarrito()
    }

    e.stopPropagation()
}


