const styleProductModels = require('../../models/Intellectual_Property/style_productsModels');

class styleProductController {
    static async getStyleProduct(req, res){
        try{
            const customer = await styleProductModels.getStyleProduct();
            res.status(200).json({data: customer});
        }catch(err){
            res.status(500).json({error: "Failed to fetch Style Product"});
        }
    }
    static async getCommission (req, res){
        try{
            const commission = await styleProductModels.getCommission();
            res.status(200).json({data: commission});
        }catch(err){
            res.status(500).json({error: 'Failed to fetch Commission'});
        }
    }
    static async addCustomerController(req, res){
        try{
            const{customer_code, customer_name, business_name, object_name, phone, email, address, lp_id, partner_id} = req.body;
            // console.log("Data Controller: ", customer_code, customer_name, business_name, object_name, phone, email, address, lp_id, partner_id, position);
            if(!customer_code){
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields",
                });
            }
            const result = await styleProductModels.addCustomer(
                customer_code, customer_name, business_name, object_name, phone, email, address, lp_id, partner_id
            );
            return res.status(201).json({
                success: true,
                message: 'Customer added successfully',
                data: result,
            })
        }catch(error){
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }
    static async updateCustomerController(req, res){
            
        try{
            const {customer_code, customer_name, business_name, object_name, phone, email, address, lp_id, partner_id, customer_id} = req.body;
            // console.log("Data Controller: ", customer_code, customer_name, business_name, object_name, phone, email, address, lp_id, partner_id, position, customer_id);
            if(!customer_code || !customer_name || !business_name || !object_name || !phone || !email || !address || !lp_id || !partner_id  || !customer_id){
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields"
                });
            }
            const result = await styleProductModels.updateCustomer(customer_code, customer_name, business_name, object_name, phone, email, address, lp_id, partner_id, customer_id);
            console.log('Result: ', result);
            return res.status(201).json({
                success: true,
                message: "Customer update successfully",
                data: result,
            })
        }catch(error){
            console.error("Error while updating customer: ", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }
    static async getStatus (req, res){
        try{
            const status_record = await styleProductModels.getStatus();
            res.status(200).json({data: status_record});
        }catch(err){
            res.status(500).json({error: 'Failed to fetch Commission'});
        }
    }
    static async addCustomerFormFile (req, res){
        try{
            const customers = req.body;
            console.log("data submit: ", customers);
            if(!Array.isArray(customers) || customers.length === 0){
                return res.status(400).json({
                    success: false,
                    message: "Invalid customer data",
                });
            }
            //Kiểm tra và lưu tất cả khách hàng
            for(const customer of customers){
                const {customer_code, customer_name, business_name, object_name, phone, email, address, lp_id, partner_id} = customer;
                if(!customer_code){
                    return res.status(400).json({
                        success: false,
                        message: "Missing required fields",
                    });
                }
                await styleProductModels.addCustomer(customer_code, customer_name, business_name, object_name, phone, email, address, lp_id, partner_id);
            }
            return res.status(201).json({
                success: true,
                message: "Customer added successfully",
            });
        }catch(error){
            console.error("Error while adding Customer: ", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            })
        }
    }
}

module.exports = styleProductController;