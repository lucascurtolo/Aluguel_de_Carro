from run import app
import controller.user_controller  # importa e registra a rota

if __name__ == '__main__':
    app.run(debug=True, port=5000)
