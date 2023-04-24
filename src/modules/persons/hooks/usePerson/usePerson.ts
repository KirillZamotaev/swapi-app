import { People, IPeople } from 'swapi-ts'
import { useState, useEffect } from 'react'

export const usePerson = (name?: string) => {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState<IPeople | null>(null)

  const getPersonInfo = async () => {
    if (name) {
      try {
        const localStorageData = localStorage.getItem(name)

        if (localStorageData) {
          setData(JSON.parse(localStorageData))
        } else {
          const data = await People.findBySearch([name])
          const people = data.resources?.map(({ value }) => value)
          const [man] = people

          setData(man)

          localStorage.setItem(name, JSON.stringify(man))
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    getPersonInfo()
  }, [name])

  return {
    isLoading,
    data,
    setData
  }
}
