<?php

$date = $_GET['date'];

if ( $date >= 1 && $date < 10 ){

    $json_data = '{
        "items":[
            {
                "title": "Большой студенческий флешмоб в Белом Парке, у дома Пушкина.",
                "link": "#"
            },
            {
                "title": "Большой студенческий флешмоб в Белом Парке, у дома Пушкина.",
                "link": "#"
            },
            {
                "title": "Большой студенческий флешмоб в Белом Парке, у дома Пушкина.",
                "link": "#"
            },
            {
                "title": "Большой студенческий флешмоб в Белом Парке, у дома Пушкина.",
                "link": "#"
            },
            {
                "title": "Большой студенческий флешмоб в Белом Парке, у дома Пушкина.",
                "link": "#"
            },
            {
                "title": "Большой студенческий флешмоб в Белом Парке, у дома Пушкина.",
                "link": "#"
            }
        ]
    }';

} else if ( $date >= 10 && $date < 20 ) {

    $json_data = '{
        "items":[
            {
                "title": "Большой студенческий флешмоб в Белом Парке, у дома Пушкина.",
                "link": "#"
            },
            {
                "title": "Большой студенческий флешмоб в Белом Парке, у дома Пушкина.",
                "link": "#"
            }
        ]
    }';

} else if ( $date >= 20 && $date < 31 ) {
    $json_data = '{
        "items":[
       
        ]
    }';
};

echo $json_data;
exit;

?>