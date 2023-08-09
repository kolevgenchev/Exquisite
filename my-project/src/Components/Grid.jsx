import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, Snackbar, Slider, Paper, Hidden } from '@mui/material';
import Alert from '@mui/material/Alert';
import Products from '../Data/Products.json';

function ProductGrid({ selectedCategory, resetGrid, onReset }) {
    const [rows, setRows] = useState(5);
    const [showAlert, setShowAlert] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [priceFilter, setPriceFilter] = useState([0, 1000]);
    const [ratingFilter, setRatingFilter] = useState(0);
    const productsInSelectedCategory = Products.find((category) => category.category === selectedCategory).products;
    const sortedProducts = [...productsInSelectedCategory].sort((a, b) => Number(a.price.substring(1)) - Number(b.price.substring(1)));
    const fiveCheapestProducts = sortedProducts.slice(0, 5);
    const filteredProducts = productsInSelectedCategory.filter((product) => {
        const price = Number(product.price.substring(1));
        const rating = product.rating.split('').filter(char => char === '★').length;
        
        console.log(`Product: ${product.name}, Price: ${price}, Rating: ${rating}, Price Filter: ${priceFilter}, Rating Filter: ${ratingFilter}`);
        
        return fiveCheapestProducts.includes(product) || (price >= priceFilter[0] && price <= priceFilter[1] && rating >= ratingFilter);
    });
    const displayedProductsCount = Math.min(rows * 4, filteredProducts.length);

    useEffect(() => {
        if (resetGrid) {
            setRows(5);
            onReset();
        }
    }, [resetGrid, onReset]);

    const handleAddToCart = () => {
        setShowAlert(true);
    };

    const handleCloseAlert = ( reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowAlert(false);
    };

    const loadMore = () => setRows(rows + 1);

    const toggleFilter = () => setShowFilter(!showFilter);

    const FilterComponent = (
        <Paper elevation={3} style={{
            marginRight: '30px',
            width: '100%',
            maxWidth: '300px',
            maxHeight: '40vh',
            padding: '20px',
            borderRadius: '10px',
            overflowY: 'auto',
            overflowX: 'hidden'
        }}>
            <div style={{ marginBottom: '40px' }}>
                <Typography variant="h6" gutterBottom>
                    Filter by
                </Typography>
            </div>
            <div style={{ marginBottom: '30px' }}>
                <Typography variant="subtitle1" gutterBottom>
                    Price range
                </Typography>
                <Slider
                    value={priceFilter}
                    min={0}
                    max={1000}
                    step={10}
                    onChange={(_, newValue) => setPriceFilter(newValue)}
                    valueLabelDisplay="auto"
                />
            </div>
            <div>
                <Typography variant="subtitle1" gutterBottom>
                    Rating
                </Typography>
                <Slider
                    value={ratingFilter}
                    min={0}
                    max={5}
                    step={1}
                    onChange={(_, newValue) => setRatingFilter(newValue)}
                    valueLabelDisplay="auto"
                />
            </div>
        </Paper>
    );

    return (
        <div style={{ paddingTop: '200px' }}>
            <Snackbar open={showAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success">
                    Product added to cart!
                </Alert>
            </Snackbar>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Hidden mdUp>
                    <Button variant="contained" onClick={toggleFilter} style={{ backgroundColor: '#1a1a1a', color: '#fff', borderRadius: '20px', marginBottom: '20px', fontWeight: 'bold' }}>
                        Filter
                    </Button>
                    {showFilter && FilterComponent} 
                </Hidden>
                <div style={{ display: 'flex', marginLeft: '10px', padding: '20px', flexDirection: 'row' }}>
                    <Hidden smDown>
                        {FilterComponent} 
                    </Hidden>
                    <Grid container spacing={2} style={{ marginLeft: '-20px' }}>
                        {Array.from({ length: rows }).map((_, rowIndex) => (
                            <Grid container item key={rowIndex} spacing={3}>
                                {filteredProducts.slice(rowIndex * 4, (rowIndex + 1) * 4).map((product, colIndex) => (
                                    <Grid item key={colIndex} xs={12} sm={6} md={4} lg={3}>
                                        <Card
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                border: '1px solid #ccc',
                                                padding: '10px',
                                                textAlign: 'center',
                                                transition: '0.3s',
                                                margin: '5px',
                                                height: '400px',
                                                '&:hover': {
                                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',

                                                },

                                            }}
                                        >
                                            <div style={{ flex: '1 0 auto' }}>
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    style={{
                                                        width: '150px',
                                                        height: '150px',
                                                        objectFit: 'cover',
                                                        marginBottom: '10px',
                                                    }}
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {product.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" style={{ fontStyle: 'italic' }}>
                                                        {product.description}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" style={{ fontSize: '20px' }}>
                                                        {product.price}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {product.rating}
                                                    </Typography>
                                                </CardContent>
                                            </div>
                                            <Button variant="contained" style={{ backgroundColor: '#1a1a1a', color: '#fff', alignSelf: 'center' }} onClick={handleAddToCart}>
                                                Add to Cart
                                            </Button>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        ))}
                    </Grid>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '100px', paddingTop: '20px' }}>
                    <div>

                        {rows < Math.ceil(filteredProducts.length / 4) && (
                            <Grid container item justifyContent="center">
                                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button variant="contained" style={{ backgroundColor: '#1a1a1a', color: '#fff', marginTop: '50px' }} onClick={loadMore}>
                                        Load More
                                    </Button>
                                </Grid>
                            </Grid>
                        )}
                        <div style={{ fontSize: '18px', fontWeight: 'normal' }}>
                            {displayedProductsCount} out of {filteredProducts.length}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductGrid;
