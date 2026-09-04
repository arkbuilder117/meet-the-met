The MET api gives us a list of all objects and their total. We need to cache those values. 

Defineetly will cache the departments becasue that never changes. Will probably chache the initial call to objects as well.

We need to store this object type for objects:
{
  total: number,
  ids: number[]
}

The key will be the department id we search by. For the initial one. We can use the string "ALL"
Other ones will be a stringified version of the department id i.e. 1, 2 3, etc.

The problem is that we need to make n+1 calls each time we filter by depertment or search by title. Beecause title alwasy returns multiple rows