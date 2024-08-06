import React, { Component } from 'react';
import {Typography, Card,CardContent,CardMedia } from '@mui/material';

interface CardsProps{
    whatIs : string |number
    headLine: string
}
const Cards: React.FC<CardsProps> = ({whatIs,headLine}) => {
return(
    <>
    <Card sx={{maxWidth:400}}>
        <CardContent>
            <CardMedia component={'img'}
                height="90"
                image='/img1.jpg'>
                
            </CardMedia>
            <br />
            <Typography  variant='h5' component="div" sx={{textAlign:'center'}}> 
                {whatIs}
            </Typography>
       
            <Typography variant='body1' sx={{textAlign:'center'}}>{headLine}</Typography>
        </CardContent>
    </Card>
    </>
)
}
export default Cards
