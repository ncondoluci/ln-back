# LN-Back
Ejercicio full stack club LN

Elegimos utilizar Typescript para reducir errores en tiempo de transpilación y escritura del programa. 
Elegimos POO para facilitar el testing.
utilizamos packete cpx como dependencia de desarrollo para realizar la copia de /utils/accounts.json (archivo utilizado como data set).

Observaciones:
Observamos que en el data set provisto el arreglo "tags" tiene una propiedad type_id que podría ser utilizada para obtener todos los tags coincidentes con "Turismo en Buenos Aires", sin embargo, existen varios objetos pertenecientes al arreglo "tags" de varias cuentas que comparten el mismo nuero de type_id pero su contenido varia en las demás propiedades. Optamos por usar la propiedad name para hacer el filtrado.

Ejemplo:
cuenta id: "c3fdbf4b-3ea4-ea11-8145-0ab6811d4821",
"tags": [
    {
        "name": "Delivery",
        "id_web": "68154",
        "type_id": "17",
        "type": "Productos Club"
    }
]

cuenta id: "e8c4ba38-0e9f-e711-812e-0ab6811d4821",
"tags": [
    {
        "name": "Turismo en Buenos Aires",
        "id_web": "68847",
        "type_id": "17",
        "type": "Productos Club"
    }
]

Observamos que la propiedad id_web en el arreglo de objetos "tags" tiene el valor "17" coincidente en todos los objetos la propiedad "name" = "turismo en buenos aires". Optamos por usar este atributo para usar realizar el

Optamos por usar injección de dependencias utilizando el patro Factory y repository para los servicios principales.

Aprovechando el typado que nos provee Typescript, podemos definir métodos privados en las clases, como por ejemplo, getClosestBranch y getHighestBenefit sin la necesidad de validar que sus parámetros no sean null o undefined.

Nos encontramos con una propiedad que no logramos conocer su propósito 'type_weight'

Entendemos que el beneficio aplica los programs names cuyos ids respectivos están en {
    benefits: {
        id: [
            id1,
            id2
        ]
    }
}

Se puede mejorar la validación del tag, ya que el mismo es un array y prodía tener más de un tag, por lo tanto, validar si en el array hay algún tag con el nombre que buscamos

Suponemos que lo que se busca indicar con "alor de beneficio más alto por cada categoría (Classic,
Premium o Black)" es:
Dentro de cada cuenta, extraer el valor más alto de la lista de beneficios en base al programa (clasic, premium o black) sin importar el beneficio en si.
Quedaria algo como:
Cuenta: COTO
BLACK: 15%
PREMIUM: 10%
CLASSIC: 5% 
(más allá de sobre qué aplique el beneficio).