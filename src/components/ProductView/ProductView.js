import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { commerce } from "../../lib/commerce";
import "./style.css";

const createMarkup = (text) => {
  return { __html: text };
};

const ProductView = () => {
  const [product, setProduct] = useState({});
  const [viewContentOpen, setViewContentOpen] = useState(false);

  const fetchProduct = async (id) => {
    const response = await commerce.products.retrieve(id);
    console.log({ response });
    const { name, price, media, quantity, description } = response;
    setProduct({
      name,
      quantity,
      description,
      src: media.source,
      price: price.formatted_with_symbol,
    });
  };

  useEffect(() => {
    const id = window.location.pathname.split("/");
    fetchProduct(id[2]);
  }, []);

  return (
    <Container className="product-view">
      <Grid container>
        <Grid item xs={12} md={6} className="image-wrapper">
          <img src={product.src} alt={product.name} />
        </Grid>
        <Grid item xs={12} md={5} className="text">
          <Typography variant="h2">
            <b>{product.name}</b>
          </Typography>
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={createMarkup(product.description)}
          />
          <Typography variant="h3" color="secondary">
            Price: <b>{product.price}</b>
          </Typography>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                size="large"
                className="custom-button"
                component={Link}
                to="/"
              >
                Continue Shopping
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                size="large"
                className="custom-button"
                onClick={() => setViewContentOpen(true)}
              >
                View Content
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Dialog
        open={viewContentOpen}
        onClose={() => setViewContentOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{product.name} - Inside Pages</DialogTitle>
        <DialogContent>
        <img src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/06/Book-Inner-Pages-with-break.jpg?auto=format&q=60&fit=max&w=930" alt={product.name} style={{ width: "100%" }} />
          {/* <img src={product.src} alt={product.name} style={{ width: "100%" }} /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewContentOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductView;
