import { useState } from 'react'
import { Alert, FlatList } from 'react-native'
import { Header } from '../../components/Header'
import { Container, Transactions } from './styles'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { spendingGetAll } from '../../spending/spendingGetAll'
import { SpendingStorageDTO } from '../../spending/SpendingStorageDTO'
import { TransactionExpenses } from '../../components/TransactionsExpenses'

export function SearchExpenses() {
  const [category, setCategory] = useState('')
  const [name, setName] = useState('')
  const [categories, setCategories] =
    useState<SpendingStorageDTO[]>([])

  async function handleSearchSpending() {

    if ((category.trim() === '') && (name.trim() === '')) {
      return Alert.alert('Atencao !!',
        'Digite alguma coisa para pesquisar.')
    }

    const data = await spendingGetAll()
    const newData = data
      .filter(dat =>
        dat.category.toUpperCase().includes(category.toUpperCase()))
      .filter(dat =>
        dat.name.toUpperCase().includes(name.toUpperCase()))

    console.log(newData)

    if (newData.length === 0) {
      setCategories([])
      return Alert.alert('Atencao !!', 'Pesquisa não encontrada.')
    }

    setCategories(newData)
  }

  return (
    <Container>
      <Header title='Pesquisa Gastos' />

      <Input
        placeholder='Categoria'
        placeholderTextColor='#363F5F'
        onChangeText={value => setCategory(value)}
      />

      <Input
        placeholder='Descrição'
        placeholderTextColor='#363F5F'
        onChangeText={value => setName(value)}
      />

      <Button
        title='Pesquisa'
        onPress={handleSearchSpending}
      />

      <Transactions>
        <FlatList
          data={categories}
          renderItem={({ item }) =>
            <TransactionExpenses data={item} />
          }
        />
      </Transactions>

    </Container>
  ) 
}

