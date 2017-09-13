import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';

import {
  addProductToSaler
} from '../../config/firebase';

class ModalNewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saler: '',
      product: '',
      unit: '',
      price: '',
      number: '',
      disableForm: false
    };
  }

  addProduct(id) {
    const newProduct = this.state;
    delete newProduct.disableForm;
    addProductToSaler(
      id,
      newProduct,
      error => {
        if (error) {
          console.log('error add product', error)
        } else {
          this.resetStates();
          close();
        }
      }
    );
  }

  resetStates() {
    this.setState({
      saler: '',
      product: '',
      unit: '',
      price: '',
      number: '',
      disableForm: false
    });
  }

  render() {
    const { close, open, salers } = this.props;
    const { saler, product, unit, price, number, disableForm } = this.state;
    console.log('MODAL NEW PREODUCT', salers);
    const disableButton = (
      saler.length === 0 ||
      product.length === 0 ||
      unit.length === 0 ||
      price.length === 0 ||
      number.length === 0
    );
    const actions = [
      <FlatButton
        label='Cancelar'
        onClick={() => {
          close();
          this.resetStates();
        }}
      />,
      <FlatButton
        label='Agregar'
        disabled={disableButton}
        onClick={() => this.addProduct()}
      />
    ];
    return (
      <Dialog
        title='Nuevo Producto'
        contentStyle={{ width: 350 }}
        modal
        autoScrollBodyContent={true}
        actions={actions}
        open={open}
      >
        <TextField
          fullWidth
          floatingLabelText="Productor"
          hintText="Productor"
          value={saler}
          onChange={(e, v) => this.setState({ saler: v })}
          disabled={disableForm}
        />

        <SelectField
          floatingLabelText="Productor"
          value={saler.length <= 0 ? null : saler}
          onChange={(e, v) => this.setState({ saler: v })}
        >
          <MenuItem value={null} primaryText="Seleccione un/a productor/a" />
          {
            saler.map((saler, index) => (
              <MenuItem value={saler.id} primaryText={saler.name} />
            ))
          }
        </SelectField>

        <TextField
          fullWidth
          floatingLabelText="Producto"
          hintText="Producto"
          value={product}
          onChange={(e, v) => this.setState({ product: v })}
          disabled={disableForm}
        />

        <TextField
          fullWidth
          floatingLabelText="Unidad"
          hintText="Unidad"
          value={unit}
          onChange={(e, v) => this.setState({ unit: v })}
          disabled={disableForm}
        />

        <TextField
          fullWidth
          floatingLabelText="Precio"
          hintText="Precio"
          value={price}
          onChange={(e, v) => this.setState({ price: v })}
          disabled={disableForm}
        />

        <TextField
          fullWidth
          floatingLabelText="Cantidad disponible"
          hintText="Cantidad disponible"
          value={number}
          onChange={(e, v) => this.setState({ number: v })}
          disabled={disableForm}
        />
      </Dialog>
    );
  }
}

ModalNewProduct.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  salers: PropTypes.array.isRequired
};

export default ModalNewProduct;