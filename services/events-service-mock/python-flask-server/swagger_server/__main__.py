#!/usr/bin/env python3

from distutils.log import debug
import connexion

from swagger_server import encoder


def main():
    app = connexion.App(__name__, specification_dir='./swagger/')
    app.app.json_encoder = encoder.JSONEncoder
    app.add_api('swagger.yaml', arguments={'title': 'Events API'}, pythonic_params=True)
    app.run(port=8081, debug=True)


if __name__ == '__main__':
    main()
