import { ThemeProvider } from '@mui/material/styles';
import Structure from "./Common/Strucutre";
import THEME from "./Theme/AppTheme"

function App() {
    return (
        <div>
			<ThemeProvider theme={THEME}>
				<Structure />
			</ThemeProvider>
        </div>
    );
}

export default App;
