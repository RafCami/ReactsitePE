import { FunctionComponent, useContext, useEffect, useState } from 'react'
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Font, Image } from '@react-pdf/renderer'
import FoodContext from '@/context/FoodContext'
import { Button } from '../ui/button'

interface GenerateGroceryListProps {}

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
})

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Oswald',
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
        fontFamily: 'Oswald',
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman',
    },
    image: {
        maxWidth: '100px',
    },
})

const GenerateGroceryList: FunctionComponent<GenerateGroceryListProps> = () => {
    const { mealPlan } = useContext(FoodContext)
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const [aisles, setAisles] = useState<string[]>(['Unknown'])
    const [products, setProducts] = useState<string[][]>([[]])

    useEffect(() => {
        const newAisles: string[] = ['Unknown']
        const newProducts: string[][] = [[]]

        mealPlan.forEach((day) => {
            day.forEach((recipe) => {
                recipe.missedIngredients.forEach((ingredient) => {
                    let aisleIndex
                    if (!ingredient.aisle || ingredient.aisle === '') {
                        aisleIndex = 0
                    } else {
                        aisleIndex = newAisles.indexOf(ingredient.aisle)
                        if (aisleIndex === -1) {
                            newAisles.push(ingredient.aisle)
                            newProducts.push([])
                            aisleIndex = newAisles.length - 1
                        }
                    }

                    if (!newProducts[aisleIndex].includes(ingredient.name)) {
                        newProducts[aisleIndex].push(ingredient.name)
                    }
                })
            })
        })

        setAisles(newAisles)
        setProducts(newProducts)
    }, [mealPlan])

    const MyDocument = () => (
        <Document>
            <Page size='A4' style={styles.body}>
                <Text key={'MealPlan'} style={styles.title} fixed>
                    Meal Plan
                </Text>
                {mealPlan.map((day, index) => {
                    const d = new Date()
                    d.setDate(d.getDate() + index + 1)
                    return (
                        <View key={index}>
                            <Text key={index} style={styles.subtitle}>
                                {days[d.getDay()]} {d.getDate()}/{d.getMonth() + 1}
                            </Text>
                            {day.map((recipe, index) => (
                                <View key={index}>
                                    <Image key={index} style={styles.image} src={recipe.image} />
                                    <Text key={index} style={styles.text}>
                                        {recipe.title}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )
                })}
            </Page>
            <Page size='A4' style={styles.body}>
                <Text style={styles.title} fixed>
                    Shopping List
                </Text>
                {aisles.map(
                    (aisle, index) =>
                        products[index] &&
                        products[index].length > 0 && (
                            <View key={index}>
                                <Text key={index} style={styles.subtitle}>
                                    {aisle}
                                </Text>
                                {products[index].map((product, index) => (
                                    <Text key={index} style={styles.text}>
                                        {product}
                                    </Text>
                                ))}
                            </View>
                        )
                )}
            </Page>
        </Document>
    )

    return (
        <div className='flex justify-center'>
            <Button className='mx-auto'>
                <PDFDownloadLink
                    document={<MyDocument />}
                    fileName={`MealPlan${new Date().getFullYear()}${
                        new Date().getMonth() + 1
                    }${new Date().getDate()}.pdf`}
                >
                    {({ loading, error }) =>
                        loading
                            ? 'Loading document...'
                            : error
                            ? 'An error occured.'
                            : 'Step 4: Download your meal plan now!'
                    }
                </PDFDownloadLink>
            </Button>
        </div>
    )
}

export default GenerateGroceryList
