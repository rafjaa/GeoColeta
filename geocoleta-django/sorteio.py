# coding: utf-8

import random

alunos = {'Mateus': 0, 'Charles': 0, 'Guilherme': 0, 'Gian': 0, 'Bruno': 0, 'Paulo Vitor': 0, 'Arthur': 0}

while True:
        a = random.choice([n for n in {'Mateus': 0, 'Charles': 0, 'Guilherme': 0, 'Gian': 0, 'Bruno': 0, 'Paulo Vitor': 0, 'Arthur': 0}])
        b = random.choice([n for n in {'Mateus': 0, 'Charles': 0, 'Guilherme': 0, 'Gian': 0, 'Bruno': 0, 'Paulo Vitor': 0, 'Arthur': 0}])
        c = random.choice([n for n in {'Mateus': 0, 'Charles': 0, 'Guilherme': 0, 'Gian': 0, 'Bruno': 0, 'Paulo Vitor': 0, 'Arthur': 0}])
        if a == b == c:
            print '\n\n  VENCEDOR: ', a
            break
        else:
            print 'Infelizes: ', set((a, b, c))



