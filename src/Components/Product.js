import React, { Component } from 'react'
import ProductTable from './ProductTable'

export class Product extends Component {
    constructor(props) {
        super();
        this.state = {            
            productName: "",
            category: 'none',
            description: "",
            price: 0.0,

            editProductId: 0,

            pNameRequired: false,
            categoryRequired: false,
            priceRequired: false,

            productList: [{ 'id': 1, 'productName': 'Nirma', 'category': 'cat1', 'description': 'Washing Powder Nirma!!', 'price': 55.5 },
            { 'id': 2, 'productName': 'Complain', 'category': 'cat2', 'description': 'I am a complain boy!!', 'price': 105.5 },
            { 'id': 3, 'productName': 'Liril', 'category': 'cat3', 'description': 'La la la lala lalalala laaa!!', 'price': 75.5 },
            { 'id': 4, 'productName': 'Maggi', 'category': 'cat4', 'description': 'Maggi Maggi Maggi!!', 'price': 30 },
            { 'id': 5, 'productName': 'Nicil', 'category': 'cat5', 'description': 'Thande darmi cool ka!!', 'price': 66.6 }]
        }


    }

    componentDidMount() {
        console.log("productlist:")
        console.log(this.state.productList)
    }

    handleChange = (event, fieldName, requiredField) => {
        this.setState({ [fieldName]: event.target.value, [requiredField]: false })
    }

    validateForm() {
        let canSubmit = true;
        if (this.state.productName === '' || this.state.productName === null || this.state.productName === undefined) {
            this.setState({pNameRequired: true})
            canSubmit = false;
        }
        if (this.state.category === '' || this.state.category === null || this.state.category === undefined || this.state.category === 'none') {
            this.setState({categoryRequired: true})
            canSubmit = false;
        }
        if (parseInt(this.state.price) === 0 || this.state.price === '') {
            this.setState({priceRequired: true})
            canSubmit = false;
        }
        return canSubmit;
    }

    clearForm() {
        this.setState({
            id: 0,
            productName: "",
            category: 'none',
            description: "",
            price: 0.0,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if(this.validateForm()) {
            if (this.state.editProductId > 0) {
                let index = this.state.productList.findIndex(x => x.id == this.state.editProductId);
                if (index) {
                    let list = this.state.productList
                    list[index].productName = this.state.productName
                    list[index].category = this.state.category
                    list[index].description = this.state.description
                    list[index].price = this.state.price

                    this.setState({ productList: list })
                    alert("Product Updated")
                    this.clearForm()
                }
            }
            else {
                let pList = this.state.productList;
                let len = pList.length;
                pList.push({
                    'id': len + 1,
                    'productName': this.state.productName,
                    'category': this.state.category,
                    'description': this.state.description,
                    'price': this.state.price
                })
                this.setState({
                    productList: pList
                }, (plist) => {console.log(plist)})
                alert("Product Added");
                this.clearForm()
            }
        }
    }

    getProductId(id) {
        this.setState({ editProductId: id })
        console.log(id)
        let product = this.state.productList.find(x => x.id == id)
        console.log(product)
        this.setState({
            productName: product.productName,
            category: product.category,
            description: product.description,
            price: product.price
        })
    }

    render() {

        const { productName, description, category, price, pNameRequired, categoryRequired, priceRequired } = this.state;
        
        const alignLeft = {
            textAlign: 'left'
        }
        const formBox = {
            boxShadow: '2px 2px 10px grey',
            borderRadius: '2px',
            padding: '20px',
            margin: '20px'
        }
        const table = {
            width: '100%',
            padding: '20px',
            boxShadow: '2px 2px 10px grey',
            borderRadius: '2px',
            marginTop: '20px'
        }
        const errorText = {color:'#df1c1c',fontSize: '13px',fontWeight:'bolder'}

        const errorField = {
            borderColor: '#ced4da',
            ':focus': {
                borderColor: pNameRequired ? '#df1c1c' : '#ced4da',
                boxShadow: pNameRequired ? '0px 1px 1px rgba(223, 28, 28, 0.075) inset, 0px 0px 8px rgba(223, 28, 28, 0.075) !important': 
                '0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(255, 100, 255, 0.5) !important'}}

        let button;
        if (this.state.editProductId > 0) {
            button = <button className="btn btn-secondary" type="submit">Update Product</button>
        }
        else {
            button = <button className="btn btn-secondary" type="submit">Add Product</button>
        }

        return (
            <div className="container-fluid">
                <div className="row">

                    <div className="col-sm-5">
                        <div style={formBox}>
                            <div className="row pl-3 mt-3">
                                <h5>PRODUCT DETAILS</h5>
                            </div>
                            <hr />
                            <form onSubmit={this.handleSubmit}>
                                <div className="row pb-2 pt-3" style={alignLeft}>
                                    <div className="col-sm-4">
                                        <label>Product Name<span style={errorText}>*</span></label>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control"
                                            placeholder="Enter Product Name"
                                            value={productName}
                                            onChange={event => this.handleChange(event, 'productName', 'pNameRequired')}></input>
                                        { pNameRequired ? (<span style={errorText}>Please enter product name!!</span>): null}
                                    </div>
                                    
                                </div>
                                <div className="row pb-2" style={alignLeft}>
                                    <div className="col-sm-4">
                                        <label>Category<span style={errorText}>*</span></label>
                                    </div>
                                    <div className="col-sm-6">
                                        <select type="text" className="form-control"
                                            value={category}
                                            onChange={event => this.handleChange(event, 'category', 'categoryRequired')}>
                                            <option value="none">None</option>
                                            <option value="cat1">Cat1</option>
                                            <option value="cat2">Cat2</option>
                                            <option value="cat3">Cat3</option>
                                            <option value="cat4">Cat4</option>
                                            <option value="cat5">Cat5</option>
                                        </select>
                                        {categoryRequired ? (<span style={{color:'#df1c1c',fontSize: '13px',fontWeight:'bolder'}}>Please choose a category!!</span>): null}
                                    </div>
                                </div>
                                <div className="row pb-2" style={alignLeft}>
                                    <div className="col-sm-4">
                                        <label>Description</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <textarea className="form-control"
                                            value={description}
                                            onChange={event => this.handleChange(event, 'description')}></textarea>
                                    </div>
                                </div>
                                <div className="row pb-3" style={alignLeft}>
                                    <div className="col-sm-4" style={alignLeft}>
                                        <label>Price<span style={errorText}>*</span></label>
                                    </div>
                                    <div className="col-sm-6">
                                        <input className="form-control" type="number" step={0.1}
                                            value={price}
                                            onChange={event => this.handleChange(event, 'price', 'priceRequired')}></input>
                                        { priceRequired ? (<span style={{color:'#df1c1c',fontSize: '13px',fontWeight:'bolder'}}>Please enter Price!!</span>): null}
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-sm-4">
                                    </div>
                                    <div className="col-sm-6 mt-2 mb-3" style={alignLeft}>
                                        {button}
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>

                    <div className="col-sm-7">
                        <div style={table}>
                        <div className="row pl-3 mt-3 mb-3">
                                <h5>PRODUCT LIST</h5>
                            </div>
                            <ProductTable data={
                                {
                                    listOfProducts: this.state,
                                    getProductId: this.getProductId.bind(this)
                                }} />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Product
