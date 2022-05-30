let fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://images.pexels.com/photos/2487443/pexels-photo-2487443.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'},
    {id: 2, title: 'Апельсины', price: 30, img: 'https://img.freepik.com/free-photo/heap-of-citrus-fruits-oranges-and-tangerines-on-a-black-wooden-background-high-quality-photo_275899-262.jpg?w=2000'},
    {id: 3, title: 'Манго', price: 40, img: 'https://gastronomija.ru/upload/iblock/46e/46e1d17e888bab10f43181e60b676c04.jpeg'}
]

const toHTML = fruit => `
    <div class="col">
        <div class="card">
            <img class="card-img-top" style="height: 200px;" src="${fruit.img}">
            <div class="card-body">
            <h5 class="card-title">${fruit.title}</h5>
            <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
            <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
            </div>
        </div>
    </div>
`

function render() {
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html
}

render()

const priceModal = $.modal({
    title: 'Цена на товар',
    closeble: true,
    width: '400px',
    footerButtons: [
        {text: 'Закрыть', type: 'primary', handler() {
            priceModal.close()
        }}
    ]
})

document.addEventListener('click', e => {
    e.preventDefault()
    const btnType = e.target.dataset.btn
    const id = +e.target.dataset.id
    const fruit = fruits.find(f => f.id === id)

    if (btnType === 'price') {

        priceModal.setContent(`
            <p>Цена на ${fruit.title}: <strong>${fruit.price}</strong></p>
        `)
        priceModal.open()
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`
        }).then(() => {
            fruits  = fruits.filter(f => f.id !== id)
            render()
        }).catch(() => {
            console.log('cancel')
        })
    }
})

