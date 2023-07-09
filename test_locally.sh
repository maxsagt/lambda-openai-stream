#!/bin/bash
sam build --cached --parallel
sam local invoke --event event.json
