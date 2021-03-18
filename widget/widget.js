const template = () => {
  const data = [
    {
      title: 'О котах',
      author: 'Иван Иванов',
      date: '15.03.21',
      time: '15:40',
      src: '#'
    },
    {
      title: 'О собаках',
      author: 'Петр Иванов',
      date: '15.03.21',
      time: '15:40',
      src: '#'
    },
    {
      title: 'Рсский язык',
      author: 'Семен Семенов',
      date: '15.03.21',
      time: '15:40',
      src: '#'
    },
    {
      title: 'Куда уходит детство',
      author: 'Евдакий Семантьев',
      date: '15.03.21',
      time: '15:40',
      src: '#'
    },
    {
      title: 'Снова мой кот',
      author: 'Иван Иванов',
      date: '15.03.21',
      time: '15:40',
      src: '#'
    }
  ]
  const items = data.map(item =>{
    return `
      <div class="widget__notice notice update" >
      <div class="notice__title" >Тема: ${item.title}</div>
      <div class="notice__author">Автор: ${item.author}</div>
      <div class="notice__date-time">
        <div class="notice__date">${item.date}</div>
        <div class="notice__time">${item.time}</div>
      </div>
      <div class="notice__more"><a href="${item.src}"> Подробнее </a> </div>
      <div data-type="notice" class="notice__check" > Отметить прочитанным </div>
      
    </div>
    `
  })

    return `
      <div class="widget__window" id="widget__window">
        ${items.join('')}
      </div>
        <div class="widget__btn"><button data-type="notif-btn"> ☰ </button></div>
          <div id="total-notif" class="widget__total-notif"></div>
        </div>

  `
}



export class Widget {
  constructor(selector) {
    this.$element = document.querySelector(selector)
    
    this.#render()
    this.#setup()
    this.#notice()

    let notification = document.getElementsByClassName('update').length
    document.getElementById('total-notif').innerHTML = notification
  }
  
  #render() {
    this.$element.classList.add('widget')
    this.$element.innerHTML = template()
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this)
    this.$element.addEventListener('click', this.clickHandler)
  }

  #notice() {
    this.clickNotice = this.clickNotice.bind(this)
    this.$element.addEventListener('click', this.clickNotice)
  }

  clickHandler(event) {
    const {type} = event.target.dataset
    if (type === 'notif-btn') {
      this.toggle()
    }
  }
  
  clickNotice(event) {
    this.any = event.target.parentNode
    if(this.isUpdate) {
      this.any.classList.remove('update')
      let notification = document.getElementsByClassName('update').length
      document.getElementById('total-notif').innerHTML = notification
      if (document.getElementsByClassName('update').length < 1) {
        document.getElementById('total-notif').style.display = 'none'
      }
    }
  }

  get isOpen() {
    return this.$element.classList.contains('show')
  }

  get isUpdate() {
    return this.any.classList.contains('update')
  }

  toggle() {
    this.isOpen ? this.hide() : this.show()
  }

  show() {
    this.$element.classList.add('show')
  }
  
  hide() {
    this.$element.classList.remove('show')
  }

  destroy() {
    this.$element.removeEventListener('click', this.clickHandler)
  }
}

