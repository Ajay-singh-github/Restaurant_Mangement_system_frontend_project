



export default function Invoice()
{
    return(
    // <head>
    //     <meta charset="UTF-8">
    //     <meta http-equiv="X-UA-Compatible" content="IE=edge">
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //     <title>Receipt Sample</title>
    //     <link rel="stylesheet" href="style.css">
    // </head>
    // <body>
        
    <div class="container">
        
        <div class="receipt_header">
        <h1>Receipt of Eating <span>Aar Restaurant</span></h1>
        <h2>Address: Thatipur Gwalior <span>Tel: +1 012 345 67 89</span></h2>
        </div>
        
        <div class="receipt_body">
    
            <div class="date_time_con">
                <div class="date">11/12/2020</div>
                <div class="time">11:13:06 AM</div>
            </div>
    
            <div class="items">
                <table>
            
                    <tr>
                        <th>QTY</th>
                        <th>ITEM</th>
                        <th>AMT</th>
                   
                        </tr>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Lorem ipsum</td>
                            <td>2.3</td>
                        </tr>
    
                        <tr>
                            <td>1</td>
                            <td>Lorem ipsum</td>
                            <td>2.3</td>
                        </tr>
    
                        <tr>
                            <td>1</td>
                            <td>Lorem ipsum</td>
                            <td>2.3</td>
                        </tr>
    
                        <tr>
                            <td>1</td>
                            <td>Lorem ipsum</td>
                            <td>2.3</td>
                        </tr>
                    </tbody>
    
                    <tfoot>
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td>32.1</td>
                        </tr>
    
                        <tr>
                            <td>Cash</td>
                            <td></td>
                            <td>32.1</td>
                        </tr>
    
                        <tr>
                            <td>Change</td>
                            <td></td>
                            <td>32.1</td>
                        </tr>
                    </tfoot>
    
                </table>
            </div>
    
        </div>
    
    
        <h3>Thank You!</h3>
    
    </div>
    
    
    )
    
}