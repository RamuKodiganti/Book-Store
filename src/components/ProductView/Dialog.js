import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
const [viewContentOpen, setViewContentOpen] = useState(false);

<Dialog
  open={viewContentOpen}
  onClose={() => setViewContentOpen(false)}
  maxWidth="md"
  fullWidth
>
  <DialogTitle>{product.name} - Inside Pages</DialogTitle>
  <DialogContent>
    <img src={product.src} alt={product.name} style={{ width: "100%" }} />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setViewContentOpen(false)} color="primary">
      Close
    </Button>
  </DialogActions>
</Dialog>
