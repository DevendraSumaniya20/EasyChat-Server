const UserModule = require("./user.modules");

class UserController extends UserModule {
  static create_user = async (req, res) => {
    try {
      console.log("controller response", req.body);
      let response = await UserModule.save_user_details(req);
      let message = "Success";
      res.send({
        success: true,
        message: message,
        data: response,
      });
    } catch (error) {
      let status_code =
        error.status_code != undefined ? error.status_code : 500;
      let type = error.type != undefined ? error.type : "Bad Request";
      let message =
        error.custom_msg != undefined
          ? error.custom_msg
          : "Something went wrong";
      res.status(status_code).send({
        success: false,
        error: type,
        message: message,
      });
    }
  };

  static get_users = async (req, res) => {
    try {
      console.log("controller response", req.body);
      let response = await UserModule.retrieve_user(req);
      let message = "Success";
      res.send({
        success: true,
        message: message,
        data: response,
      });
    } catch (error) {
      console.error("Error in get_users:", error);
      let status_code =
        error.status_code !== undefined ? error.status_code : 500;
      let type = error.type !== undefined ? error.type : "Bad Request";
      let message =
        error.custom_msg !== undefined
          ? error.custom_msg
          : "Something went wrong";
      res.status(status_code).send({
        success: false,
        error: type,
        message: message,
      });
    }
  };

  static otp_verify = async (req, res) => {
    try {
      console.log("controller response", req.body);
      let response = await UserModule.verify_user(req);
      if (response.status) {
        res.send({
          success: true,
          message: response.message,
          data: response.user,
        });
      } else {
        res.status(400).send({
          success: false,
          error: false,
          message: response.message,
        });
      }
    } catch (error) {
      let status_code =
        error.status_code != undefined ? error.status_code : 500;
      let type = error.type != undefined ? error.type : "Bad Request";
      let message =
        error.custom_msg != undefined
          ? error.custom_msg
          : "Something went wrong";
      res.status(status_code).send({
        success: false,
        error: type,
        message: message,
      });
      res.end();
    }
  };
}

module.exports = UserController;
