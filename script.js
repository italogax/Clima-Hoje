// Adiciona um ouvinte de enventos ao formulário com o ID 'wather-form'.
document.getElementById('weather-form').addEventListener('submit', function(e) {
    // Impede o comportamento padrão de envio do formulário.
    e.preventDefault();

    // Obtém o valor inserido pelo usuário no campo de entrada com o ID 'city-input'.
    const city = document.getElementById('city-input').value;

    // API da chave OpenWeatherMap.
    const apiKey = 'fb9af554cce5eb7381279360c8430675'

    // Cria a URL para fazer a solicitação à API da OpenWeatherMap.
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt`;

    // Faz uma solicitação GET à URL usando a função fetch().
    fetch(url)
        // Converte a resposta da API em formato JSON.
        .then(response => response.json())
        // Manipula os dados retornados pela API.
        .then(data => exibirClima(data))
        // Captura e trata qualquer erro que ocorra durante a solicitação à API.
        .catch(error => {
            // Exibe uma mensagem de erro no elemento 'weather-result'.
            console.error('Erro ao buscar os dados da API:', error);
            document.getElementById('weather-result').innerHTML = 'Não foi possível obter os dados do clima.';
        })

})

// MANIPULANDO O RESULTADO
function exibirClima(data) {
    const resultadoDiv = document.getElementById('weather-result');
    const descricaoClima = data.weather[0].description;
    const iconeCodigo = data.weather[0].icon;
    const iconeUrl = `https://openweathermap.org/img/wn/${iconeCodigo}@2x.png`;

    resultadoDiv.innerHTML = ''; // Limpa resultados anteriores.
    
    if(data.main) {
        resultadoDiv.style.display = 'block'; // Altera a função display para um metodo visível. 
        
        // Cria e adiciona o título
        const titulo = document.createElement('h2')
        titulo.textContent = `Clima em ${data.name}`;
        resultadoDiv.appendChild(titulo);

        // Cria e adiciona parágrafos para temperatura.
        const temperatura = document.createElement('p');
        temperatura.textContent = `Temperatura: ${data.main.temp}°C`;
        resultadoDiv.appendChild(temperatura);

        // Criando parágrafo com o icone.
        const icone = document.createElement('p');
        icone.innerHTML = `<img src="${iconeUrl}" alt="${descricaoClima}">`;
        resultadoDiv.appendChild(icone);

        // Criando parágrafos para descrição.
        const descricao = document.createElement('p');
        descricao.textContent = `${descricaoClima}`;
        resultadoDiv.appendChild(descricao);

    } else {
        resultadoDiv.innerHTML = '<p>Cidade não encontrada. Tente novamente!</p>';
    }
}