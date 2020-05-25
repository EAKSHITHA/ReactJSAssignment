import React, { Component } from 'react'

export class ProductTable extends Component {

    handleEdit = (event) => {
        console.log("product:")
        console.log(event.currentTarget.value)
        this.props.data.getProductId(event.currentTarget.value)
    }

    render() {

        const { productList } = this.props.data.listOfProducts
        return (
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productList.map((product) =>
                                <tr key={product.id}>
                                    <td>{product.productName}</td>
                                    <td>{product.category}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td style={{ cursor: 'pointer' }}>
                                        <button className="btn btn-sm btn-secondary" value={product.id} onClick={this.handleEdit}>Edit</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProductTable
