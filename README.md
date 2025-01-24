# About

Curso de Typescript para iniciantes, realizado na Origamid e lecionado pelo André Rafael.

# Introdução

## Types

O tipo define o que podemos fazer com um dado.

Quando definimos uma constante no arquivo javascript e atribuímos um valor a ela, a própria IDE
já é capaz de nos mostrar as propriedades daquela constante.

Se for uma string, aparecerá métodos de String, se for um Array, propriedades de array, veja:

```javascript
const frase = 'Front End';
const total = 100.05;
const empresas = ['Apple', 'Microsoft'];
const body = document.body;
const button = document.querySelector('button');

frase.toLowerCase();
// frase.toFixed();

total.toFixed();
// total.toLowerCase();

empresas.map((empresa) => empresa.toUpperCase());
// empresas.toLowerCase();

body.style.background = '#000';
// body.map((item) => item);

console.log(button);
// button.click();

const operacao = true + 'teste' - (4 * {}) / [];
const strings = 'Front ' + 'End';
const numbers = 100 + 200;
console.log(operacao, strings, numbers);
```

### Como os erros são identificados? 

Porque o TypeScript já está funcionando no fundo da nossa IDE (mesmo que não tenhamos nenhum arquivo TS criado).

### Possíveis erros com JS

Entretanto, somente com o JS, caso tentássemos realizar uma operação que não condiz com o valor, ele não nos mostraria
um erro, veja:

```javascript
const total = 100.05;

total.lowerCase();

total.toFixed();
```

Ele deveria nos mostrar um erro, visto que é um número tentando ser convertido para ``lowerCase()``.

Já o TypeScript, irá nos apontar esses erros na IDE.

Outra coisa interessante, é que o método ``toFixed()``, além de arrendondar o número, ele transforma o mesmo numa
String.

Ou seja, caso tentássemos por ventura, pegar o numero arredondado (100) e somar com + 10, o resultado seria ``10010``.

Isso é outro exemplo do que o JavaScript permite, mas que com o TypeScript, não será possível.

### Type annotations

Até a presente data, o JavaScript não possui uma forma de indicar o tipo de dado que uma variável terá.

Sim, quando declaramos variáveis simples como ``const frase = "Olá"`` ele identifica que é uma String. O problema em sí
é quando começamos a trabalhar com funções.

Não é possível, por exemplo, prever o argumento que será passado no parâmetro de funções, então utilizamos as
type annotations, "anotações de tipo".

Nós anotamos o tipo que ela irá receber e o tipo que irá retornar!

### Proposta para o JS

Existe em proposta a ideia de incluir uma sintaxe parecida com a do TypeScript direto no JavaScript:

[Link github - proposal](https://github.com/tc39/proposal-type-annotations)

❗Importante, esse resumo é datado de 2017, já o curso do André é de um pouco antes. No momento, utilizando o InteliJ,
ele foi sim capaz de identificar o objeto declarado como string e foi mostrado os métodos de filter, e também foi possível
acessar as características do objeto, como o "tipo".

![img.png](img.png)

Exemplo na IDE (talvez com o VSCode) seja assim:

![img_1.png](img_1.png)

Repare, não é possível acessar as características do objeto.

### Ferramentas TypeScript

## Node, NPM, Git

[Veja link de como instalar](https://www.origamid.com/curso/html-e-css-para-iniciantes/0801-instalar-ferramentas)

## VSCode

Opcional, eu uso Intellij.

Plugins: Liver Server, Origamid Next, Prettier

## Importando TS

Iremos criar um ``script.ts``.

❗Importante: nós não iremos importar o ``script.ts`` para o HTML.

Iremos rodar um código NPM, entenda:

Os principais programas que executam JavaScript (browser/node), não conseguem executar TypeScript. Por isso precisamos 
de um compilador para gerar um arquivo JavaScript a partir de um TypeScript.

```bash
npm install -g typescript
```

Após instalado, rodamos outro comando para que ele compile o arquivo TS em JS.

```bash
tsc script.ts
```

Ele irá criar um arquivo JS idêntico, com o mesmo código digitado!

<hr>

Para não ser necessário rodar o código acima após realizar uma alteração, iremos rodar o código abaixo. Esse
comando irá criar um arquivo ``tsconfig.son``.

```bash
tsc --init
```

Iremos abordar esse arquivo futuramente, mas iremos focar por agora somente em 3 propridades dele:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "strict": true
  }
}
```

Target irá selecionar a versão do javascript. Iremos usar a mais recente possível ``ESNext``.

O Strict mudará diversas outras configurações, uma delas é não deixar nenhum tipo de "any" acontecer.

Ou seja, se criarmos uma função, será obrigatório declarar que tipo de dado ela irá receber.

![img_2.png](img_2.png)

Para que ele fique observando as alterações e faça a compilação automaticamente, usamos:

```bash
tsc -w
```

Assim, ele ficará em "watch mode".


# Prática

## Annotation 

O TypeScript nos permite indicar qual será o tipo de dado de uma variável através de anotações (: string).

Antes:

```ts
const produto = 'Livro';

let preco = 200;

const carro: {
  marca: 'Audi',
  portas: 5,
};
```

Agora, podemos realizar as declarações. 

❗Importante: quando for um objeto, precisamos declarar antes dele, o que cada atributo terá como tipo!

```ts

const produto: string = "Livro";

const number: number = 200;

// Criamos a constante, utilizamos ":" e abrimos o objeto declarando o tipo das variáveis.
// Além disso, usamos ";" no final.

const carro: {
    marca: string;
    portas: number;
} = {
    marca: "Audi",
    portas: 5
}
```

## Inferência

O TypeScript consegue inferir o tipo de dado de expressões em JavaScript.

Por exemplo, sempre que ele conseguir inferir, você NÃO precisa fazer a anotação do dado.

Então não é sempre que iremos precisar declarar o tipo de uma variável! Na verdade, é até mesmo uma
boa prática não anotar sempre.

**Agora, no tocante a uso de funções onde teremos parâmetro que não iremos saber ao certo seus tipos, o ideal
é que sim, declaremos o tipo esperado delas.**

### Annotations em funções

As anotações são necessárias quando lidamos com funções.

```ts
function somar(a: number, b: number) {
    return a + b;
}

somar(5, 10)

//somar("10", "10") - não irá funcionar, pois é String e declaramos que somente
//number seria aceito

const nintendo = {
    nome: "Nintendo",
    preco: '2000'
};

//note que precisamos passar o tipo dos atributos do objeto
function transformarPreco(produto: {nome: string; preco: string}) {
    produto.preco = 'R$ ' + produto.preco;
    return produto;
}

const novoProduto = transformarPreco(nintendo)
console.log(novoProduto)
```

## Tipos básicos primitivos (Number, String, Typof...)

### Number, String, Boolean

String, number e boolean são tipos básicos do TypeScript (primitivos).

Também existem outros como: null, undefined, etc.

```ts
const frase: string = 'Front End';
const preco: number = 500;
const condi: boolean = preco > 100;
```

### Typeof

É um operador JavaScript que retorna uma String indicando o tipo do dado.

Os possíveis valores retornados por typeof são: string, number, boolean, function, object, undefined, bigint e symbol.

O typeof funciona como um "type guard".

**❗importante: funciona bem com tipos primitivos, mas com objetos não tanto.**

```ts
const frase = 'Front End';
const preco = 500;
const condi = preco > 100;

//nós escrevemos 'string'/'number'/'number' porque o retorno dele falando se é um ou outro, é uma string.
if (typeof frase === 'string') {
  console.log('frase é string');
}
if (typeof preco === 'number') {
  console.log('preco é number');
}
if (typeof condi === 'boolean') {
  console.log('condi é boolean');
}
```

#### Typeof com objetos

O mesmo não funciona tão bem com objetos porque afinal... muitas coisas são objetos: arrays, objects, null.

O ideal será usar [instanceOf](), veremos mais a frente.

#### Type guard

Seria uma "proteção" do tipo!

```ts
const frase = 'Front End';
if (typeof frase === 'string') {
    console.log('frase é string');
}
```

Dentro do if nós basicamente deixamos claros: só será possível trabalhar com "frase" se a mesma for do tipo String.

#### String, Number, Boolean ≠ string, number, boolean

Os tipos primitivos declarados com letra maiúscula, são funções construtoras dos tipos primitivos que começam com letra
minúscula.

String, Number e Boolean são responsáveis pela herança das propriedades e métodos do mesmos (``toLowerCase()``, 
``toFixed()``, etc).

```ts
const frase1 = new String('Front End'); //gera um novo objeto do tipo String
const frase2 = String('Front End'); //usa a função construtora, isso é uma string, não um object
const frase3 = 'Front End'; //string pura, onde podemos utilizar os métodos do objeto (protótipo, "String"), exemplo ⬇️

String.prototype.toLowerCase()

console.log(typeof frase1);
console.log(typeof frase2);
console.log(typeof frase3);
```

## Union Types

É comum termos funções que podem retornar ou receber tipos diferentes. Para isso usamos a barra vertical, exemplo:

``string | number | boolean``

```ts
//comecou com numero
let total: string | number = 200;

//terminou com string
total = '300';
```

### Em função

Funções podem receber parâmetros com diferentes tipos e também podem retornar diferentes tipos de dados.

**Entretanto, mesmo que ela receba diferentes tipos de valor, o ideal é que ela retorne somente UM tipo de valor (boolean,
string).**

```ts
import validate = WebAssembly.validate;

function isNumber(value: string | number) {
    if (typeof value === 'number') {
        return true;
    } else {
        return false;
    }
}
```

### DOM

No DOM, o Union Type vai funcionar a todo momento! Ora, o TypeScript não tem como verificar todo o arquivo HTML, ele
também não faz ideia do que existe no DOM.

No exemplo abaixo, selecionamos um button. Entretanto, ele não tem como saber se ele virá ou não! Portanto, pode ser
um HTMLButtonElement ou null.

```ts
// Retorna HTMLButtonElement | null
const button = document.querySelector('button');

// Optional chaining
// Executa click() se button for diferente de null/undefined
button?.click();

//a grosso modo: button existe? se sim, click se não retorne null/undefined.
```

## Trabalhando com objetos - Types e interfaces

Nós podemos definir a forma de um objeto de uma maneira parecida com a que criamos um objeto, veja:

```ts
function preencherDados(dados : {
    //chave e depois do ":" tipo do dado, usando ";" no final
    nome: string;
    preco: number;
    teclado: boolean;
})
```

E podemos logo após, passar um HTML para acessar os atributos dessa função.

```ts
function preencherDados(dados : {
    //chave e depois do ":" tipo do dado, usando ";" no final
    nome: string;
    preco: number;
    teclado: boolean;
}) {
    document.body.innerHTML = `
    <div>
        <h1>${dados.nome}</h1>
        <p>R$ ${dados.preco}</p>
        <p>Inclui teclado: ${dados.teclado ? 'sim' : 'não'}</p>
    
    </div>
    
    `;

}

preencherDados({
    nome: 'Smartphone',
    preco: 999.99,
    teclado: true,
})
```

O problema dessa função é que ela acaba ficando muito complexa e com muita informação. Existe uma maneira da gente
melhorar a escrita dela, utilizaremos o ``Type``, veja:

### Type

Essa palavra-chave cria um atalho (um alias) para um tipo customizado! Veja abaixo, criamos um tipo que pode ser
number ou string e partir disso, podemos usar esse tipo em uma variável.

```ts
//pode ser number ou string
type NumberOrString = number | string;

let total: NumberOrString = 10;

//e alteramos de number para string
total = '200';
```

O exemplo acima não se faz tanto sentido usar. Mas para um tipo mais complexo (como objeto), sim, veja outro exemplo:

```ts
type Produto = {
    nome: string;
    preco: number;
    teclado: boolean;
};

function preencherDados(dados: Produto) {
    document.body.innerHTML = `
    <div>
        <h1>${dados.nome}</h1>
        <p>R$ ${dados.preco}</p>
        <p>Inclui teclado: ${dados.teclado ? 'sim' : 'não'}</p>
    
    </div>
    `;
}

//criamos o objeto declarando o seu tipo
const computador: Produto = {
    nome: "Computador",
    preco: 2000,
    teclado: true
}

preencherDados(computador);
```

Isso não serve só para um objeto, outro bom exemplo é com categorias!

```ts
type Categorias = 'design' | 'codigo' | 'descod'

//frisamos para ele aceitar somente do tipo Categoria, ou seja, umas das 3 strings acima
function pintarCategoria(categoria: Categorias) {
    console.log(categoria);
    
    //da pra utiizar ifs também
    if (categoria == 'design') {
        console.log("Pintar de vermelho")
    }
}

pintarCategoria('codigo');
```

### Interface

Funciona na maioria dos casos da mesma forma que type, porém possui uma sintaxe diferente. As interfaces são geralmente
utilizadas para definirmos objetos.

Essa diferença vai ser explorada em tópicos futuros. Por hora, utilizaremos **Type para tipos primitivos** e **Interface
para objetos**.

```ts
interface InterfaceProduto {
    nome: string;
    preco: number;
    teclado: true;
}

type TypeProduto = {
    nome: string;
    preco: number;
    teclado: true;
}

function preencherDados(dados: InterfaceProduto) {
    document.body.innerHTML += `
  <div>
    <h2>${dados.nome}</h2>
    <p>R$ ${dados.preco}</p>
    <p>Inclui teclado: ${dados.teclado ? 'sim' : 'não'}</p>
  </div>
  `;
}
```

## Arrays

Uma array é definida com o tipo de dado que ela possui, seguida por [].

Uma array também pode possuir union types (dois tipos diferentes), number/string.

```ts
const numeros = [10, 30, 40, 5, 3, 30];
const valores = [10, 'Taxas', 40, 'Produto', 3, 30];

function maiorQue10(data: number[]) {
    return data.filter((n) => n > 10);
}

console.log(maiorQue10(numeros))

function filtrarValores(data: (number | string)[]) {
    return data.filter((item) => typeof item === 'number');
}

console.log(filtrarValores(valores));
```

Podemos também possuir array de arrays, veja:

```ts
const dados: (string | number)[][] = [
    ['senhor dos aneis', 80],
    ['a guerra dos tronos', 120],
]
```

### Sintaxe alternativa array

Existe uma sintaxe alternativa onde usamos Array<type>. Sendo type o tipo de dado dentro da array.

```ts
const numeros = [10, 30, 40, 5, 3, 30];
const valores = [10, 'Taxas', 40, 'Produto', 3, 30];


function maiorQue10(data: Array<number>) {
    return data.filter((i) => i > 10);
}

function filtrarValores(data: Array<number | string>) {
    return data.filter((item) => typeof item === 'number');
}
```


