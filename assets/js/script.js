const shapesNav = document.getElementById('shapesNav')
const description = document.getElementById('description-text')

shapesNav.addEventListener('click', (event) => {
    const clickedShape = event.target.closest('.shape-item')

    if (clickedShape) {
        const shapeId = clickedShape.getAttribute('id')
        console.log(shapeId)

        switch (shapeId) {
            case 'shape-triangle':
                handleShapeInput('Triangle', ['Base', 'Height'], (inputs) => {
                    const [base, height] = inputs.map(parseFloat)
                    const area = 0.5 * base * height
                    return `The area of the triangle is ${area.toFixed(2)}`
                })
                break
            case 'shape-circle':
                handleShapeInput('Circle', ['Radius'], (inputs) => {
                    const radius = parseFloat(inputs[0])
                    const area = Math.PI * radius * radius
                    return `The area of the circle is ${area.toFixed(2)}`
                })
                break
            case 'shape-square':
                handleShapeInput('Square', ['Side'], (inputs) => {
                    const side = parseFloat(inputs[0])
                    const area = side * side
                    return `The area of the square is ${area.toFixed(2)}`
                })
                break
        }
    }
})

function handleShapeInput(shapeName, inputFields, calculateArea) {
    shapesNav.innerHTML = '' 
    description.innerText = `Enter the dimensions for ${shapeName}`

    const formContainer = document.createElement('div')
    formContainer.classList.add('form-container')

    const form = document.createElement('form')
    form.classList.add('shape-form')

    inputFields.forEach(field => {
        const label = document.createElement('label')
        label.textContent = `${field}:`
        label.classList.add('input-label')

        const input = document.createElement('input')
        input.type = 'text'
        input.placeholder = `Enter ${field}`
        input.classList.add('shape-input')
        input.required = true

        form.appendChild(label)
        form.appendChild(input)
    })

    const submitBtn = document.createElement('button')
    submitBtn.type = 'submit'
    submitBtn.classList.add('submit-btn')
    submitBtn.textContent = 'Submit'
    form.appendChild(submitBtn)

    formContainer.appendChild(form)
    document.body.appendChild(formContainer)

    form.addEventListener('submit', (event) => {
        event.preventDefault()

        const inputs = Array.from(form.querySelectorAll('.shape-input')).map(input => input.value.trim())
        const isValid = inputs.every(input => /^[0-9]+(\.[0-9]+)?$/.test(input))

        if (isValid) {
            const result = calculateArea(inputs)
            displayResult(result)
        } else {
            alert('Please enter valid numbers')
        }
    })
}

function displayResult(result) {
    const formContainer = document.getElementById('inputForm') || document.querySelector('.form-container')
    formContainer.innerHTML = ''  

    const resultText = document.createElement('h3')
    resultText.classList.add('result-text')
    resultText.textContent = result
    formContainer.appendChild(resultText)

    const startOverBtn = document.createElement('button')
    startOverBtn.id = 'startOver'
    startOverBtn.classList.add('start-over-btn')
    startOverBtn.textContent = 'Start Over'
    formContainer.appendChild(startOverBtn)

    startOverBtn.addEventListener('click', () => location.reload())
}

