import { People, IPeople } from 'swapi-ts'
import { useState, useEffect, useMemo } from 'react'

export const usePerson = (name = '') => {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState<IPeople | null>(null)
  const id = useMemo(() => name?.replace(/\s/g, ''), [name])

  const getPersonInfo = async () => {
    if (name) {
      try {
        const localStorageData = localStorage.getItem(id)

        if (localStorageData) {
          setData(JSON.parse(localStorageData))
        } else {
          const data = await People.findBySearch([name])
          const people = data?.resources?.map(({ value }) => value)
          const [man] = people

          setData(man)

          localStorage.setItem(id, JSON.stringify(man))
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
    id,
    isLoading,
    data,
    setData
  }
}
