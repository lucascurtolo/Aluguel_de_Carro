from run import app
import controller.user_controller 
import controller.car_controller

if __name__ == '__main__':
    app.run(debug=True, port=5000)
