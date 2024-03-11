import Header from '../../components/Header/Header'

const RecipesPage = ({ isLoggedIn, setIsLoggedIn }) => {

    return (
        <div>
            <Header 
                setIsLoggedIn={setIsLoggedIn}
            />
            <h1>Recipes Page</h1>
        </div>
    )
}

export default RecipesPage;