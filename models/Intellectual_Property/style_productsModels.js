const { error } = require('console');
const db = require('../../config/index');
const dayjs = require('dayjs');
const path = require('path');

class styleProductModels {
    static async getStyleProduct () {
        try{
          // const BASE_URL = process.env.baseFilePath
          const BASE_URL = 'http://localhost:5000/uploads'
          const URL_STATUS = 'http://localhost:5000/uploads_status'
            const [rows] = await db.query(`SELECT c.customer_id,
                                                c.customer_code,
                                                c.customer_name,
                                                c.business_name,
                                                c.object_name,
                                                c.phone,
                                                c.email,
                                                c.address,
                                                c.customer_status,
                                                record.staff_id,
                                                l.lp_name,
                                                l.lp_id,
                                                p.partner_name,
                                                p.partner_id,
                                                commission.commission_id,
                                                commission.commission_name,
                                                record.record_id,
                                                record.record_code,
                                                record.form,
                                                record.image,
                                                record.authorization,
                                                record.business_license,
                                                record.orther,
                                                s.status_id,
                                                s.status_name,
                                                s.form_code,
                                                s.application_date,
                                                s.patent_code,
                                                s.date_of_issuance,
                                                s.patent,
                                                s.expiration_date,
                                                staff.staff_name,
                                                ct.contract_id,
                                                ct.contract_code,
                                                ct.contract_name,
                                                ct.acceptance,
                                                ct.settlement,
                                                ct.bill,
                                                ct.contract
                                        FROM 
                                                customer as c
                                                LEFT JOIN 
                                                    partner as p ON c.partner_id = p.partner_id
                                                LEFT JOIN 
                                                    lead_provider as l ON c.lp_id = l.lp_id
                                                LEFT JOIN 
                                                    record ON record.customer_id = c.customer_id 
                                                LEFT JOIN 
                                                    commission ON commission.commission_id = record.commission_id
                                                LEFT JOIN
                                                    status_record as s ON s.record_id = record.record_id
                                                LEFT JOIN 
                                                    contract as ct ON ct.record_id = record.record_id
                                                LEFT JOIN 
                                                    staff ON staff.staff_id = record.staff_id
                                        WHERE 
                                                c.customer_code IS NULL OR c.customer_code LIKE "KD%"
                                        ORDER BY 
                                                  c.customer_id DESC;
            `);

            // console.log("Data: ", rows);
            // //chuyển định dạng ngày tháng
            // const formattedRows = rows.map(customer => ({
            //     ...customer,
            //     application_date: dayjs(customer.application_date).format('DD-MM-YYYY'),
            //     date_of_issuance: dayjs(customer.date_of_issuance).format('DD-MM-YYYY'),
            //     expiration_date: dayjs(customer.expiration_date).format('DD-MM-YYYY'),
            // }));
            // Chuyển đổi định dạng ngày tháng và gắn URL cho các file
            const formattedRows = rows.map(customer => ({
              ...customer,
              form: customer.form ? `${BASE_URL}/${customer.form}` : null,
              image: customer.image ? `${BASE_URL}/${customer.image}` : null,
              authorization: customer.authorization
                  ? `${BASE_URL}/${customer.authorization}`
                  : null,
              business_license: customer.business_license
                  ? `${BASE_URL}/${customer.business_license}`
                  : null,
              orther: customer.orther ? `${BASE_URL}/${customer.orther}` : null,

              patent: customer.patent ? `${URL_STATUS}/${customer.patent}` : null,

              application_date: dayjs(customer.application_date).format('DD-MM-YYYY'),
              date_of_issuance: dayjs(customer.date_of_issuance).format('DD-MM-YYYY'),
              expiration_date: dayjs(customer.expiration_date).format('DD-MM-YYYY'),
          }));

            // Nhóm dữ liệu theo customer_id
        const groupedData = formattedRows.reduce((acc, curr) => {
        // Tìm customer trong danh sách
        let customer = acc.find(c => c.customer_id === curr.customer_id);
  
        if (!customer) {
          // Nếu customer chưa tồn tại, thêm mới
          customer = {
            customer_id: curr.customer_id,
            customer_code: curr.customer_code,
            customer_name: curr.customer_name,
            business_name: curr.business_name,
            object_name: curr.object_name,
            phone: curr.phone,
            email: curr.email,
            address: curr.address,
            customer_status: curr.customer_status,
            partner_id: curr.partner_id,
            partner_name: curr.partner_name,
            lp_id: curr.lp_id,
            lp_name: curr.lp_name,
            introducer: curr.introducer,
            commission: curr.commission,
            commission_name: curr.commission_name,
            staff_name: curr.staff_name,
            list_profile: [],
          };
          acc.push(customer);
        }
  
        // Tìm hồ sơ (profile) trong danh sách của customer
        let profile = customer.list_profile.find(p => p.record_id === curr.record_id);
  
        if (!profile && curr.record_id) {
          // Nếu hồ sơ chưa tồn tại, thêm mới
          profile = {
            record_id: curr.record_id,
            profile_code: curr.profile_code,
            record_code: curr.record_code,
            form: curr.form,
            image: curr.image,
            authorization: curr.authorization,
            business_license: curr.business_license,
            orther: curr.orther,
            commission_id: curr.commission_id,
            commission_name: curr.commission_name,
            status_profile: [],
            contracts: [],
          };
          customer.list_profile.push(profile);
        }
  
        // Thêm trạng thái vào hồ sơ nếu có
        if (curr.status_name) {
          profile.status_profile.push({
            status_id: curr.status_id,
            status_name: curr.status_name,
            form_code: curr.form_code,
            application_date: curr.application_date,
            patent_code: curr.patent_code,
            date_of_issuance: curr.date_of_issuance,
            patent: curr.patent,
            expiration_date: curr.expiration_date
          });
        }
  
        // Thêm hợp đồng vào hồ sơ nếu có
        if (curr.contract_code) {
          profile.contracts.push({
            contract_id: curr.contract_id,
            contract_code: curr.contract_code,
            contract_name: curr.contract_name,
            acceptance: curr.acceptance,
            settlement: curr.settlement,
            bill: curr.bill,
            contract: curr.contract,
          });
        }
  
        return acc;
      }, []);
      // console.log("Group data: ", groupedData);
      return groupedData;
    } catch (error) {
      console.error('Error during getCustomerData:', error);
      throw new Error('Failed to fetch customer data');
    }
}
    static async getCommission () {
      try{
        const sql =  `SELECT * FROM commission`
        const [rows] = await db.query(sql);
        return rows;
      }catch(error){
        throw new Error('Database query failed');
      }
    }
    static async addCustomer (customer_code, customer_name, business_name, object_name, phone, email, address, lp_id, partner_id){
      console.log("Data models: ", customer_code, customer_name, business_name, object_name, phone, email, address, lp_id, partner_id);
      try{
        const query = `INSERT INTO customer (customer_code, customer_name, business_name, object_name, phone, email, address, lp_id, partner_id) VALUES(?,?,?,?,?,?,?,?,?)`;
        const [result] = await db.query(query, [customer_code, customer_name, business_name, object_name, phone, email, address,lp_id, partner_id]);
        return{
          success: true,
          message: "Cusstomer add sucessfully",
          insertedId: result.insertId,
        };
      }catch(error){
        // throw new Error('Failed to add Customer');
        console.error("Error while adding Customer:", error);  // In lỗi chi tiết
    return {
        success: false,
        message: "Internal server error",
        error: error.message,  // Trả lỗi chi tiết về client để debug
    };
      }
    }
    static async updateCustomer (customer_code, customer_name, business_name, object_name, phone, email, address, lp_id, partner_id, customer_id){
            // console.log("Data Models: ", customer_code, customer_name, business_name, object_name, phone, email, address, lp_id, partner_id, position, customer_id);
      try{
        const query = `UPDATE customer SET customer_code = ?, customer_name =?, business_name=?, object_name=?, phone=?, email=?, address=?, lp_id=?, partner_id=? WHERE customer_id = ?`;
        const [result] = await db.query(query, [customer_code, customer_name, business_name, object_name, phone, email, address,lp_id, partner_id, customer_id ]);
        if(result.affectedRows === 0){
          return{
            success: false,
            message: "Customer not found or not change made",
          }
        }
        return{
          success: true,
          message: "Customer update successfully",
        }
      }catch(error){
        throw new error("Failed to update Customer");
      }
    }
    static async getStatus() {
      try{
        const sql =  `SELECT * FROM status_record`
        const [rows] = await db.query(sql);
        return rows;
      }catch(error){
        throw new Error('Database query failed');
      }
    }
    static async getCustomerPotential(){
      try{
        const sql = `SELECT * FROM customer WHERE customer_status = "Khách hàng tiềm năng"`;
        const [rows] = await db.query(sql);
        return rows;
      }catch(error){
        throw new Error ("Database query failed");
      }
    }
    static async updateStatusCustomer(customer_status, customer_id){
      try{
        // console.log("Data model: ", customer_status, customer_id);
        const query = `UPDATE customer SET customer_status = ? where customer_id =?`;
        const [result] = await db.query(query, [customer_status, customer_id]);
        if(result.affectedRows ===0){
          return{
            success: false,
            message: "Customer not found or not change made",
          }
        }
        return{
          success: true,
          message: "Customer update successfully"
        }
      }catch(error){
        throw new error("Failed to update Customer");
      }
    }
}

module.exports = styleProductModels;