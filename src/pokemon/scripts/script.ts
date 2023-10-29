document.addEventListener("DOMContentLoaded", () => {
    const getPokemonBtn = document.getElementById("getPokemonBtn") as HTMLButtonElement;
    const pokemonInput = document.getElementById("pokemonInput") as HTMLInputElement;
    const pokemonInfoDiv = document.getElementById("pokemonInfo");
    const inputError = document.getElementById('inputError');

    getPokemonBtn.addEventListener("click", async () => {
        if (!pokemonInput.checkValidity()) {
            // Input validation failed
            if (inputError) {
                inputError.textContent = "Only alphanumeric characters are allowed."
                inputError.style.display = 'block';
                return;
            }
        }

        if (inputError) {
            inputError.textContent = "";
            inputError.style.display = 'none';
        }

        const pokemonName = pokemonInput.value.toLowerCase();
        const removeButton = document.createElement('button');
        removeButton.classList.add('removeButton');
        removeButton.textContent = 'Remove';

        const data = await fetchPokemonData(pokemonName);
        const info = generatePokeInfo(data);

        // Create a new container for the Pokemon information
        const pokemonInfoContainer = document.createElement('div');
        pokemonInfoContainer.classList.add('pokemon-info');
        pokemonInfoContainer.innerHTML = info;

        if (!pokemonInfoDiv) {
            console.error("pokemonInfoDiv is null. Cannot update the element.");
            return;
        }

        // Append the new container to the existing results
        pokemonInfoDiv.appendChild(pokemonInfoContainer);

        removeButton.addEventListener('click', () => {
            // Remove the corresponding result when the Remove button is clicked
            if (pokemonInfoContainer) {
                pokemonInfoDiv.removeChild(pokemonInfoContainer);
            }
        });

        // Append the new container to the existing results
        pokemonInfoContainer.appendChild(removeButton);
        pokemonInfoDiv.appendChild(pokemonInfoContainer);
    });
});

async function fetchPokemonData(pokemonName: string): Promise<string> {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching Pokémon data", error);
        return "Pokémon not found. Please check the name.";
    }
}

function generatePokeInfo(data: any) {
    const name = data.name;
    const id = data.id;
    const abilities = data.abilities.map((ability: any) => ability.ability.name).join(", ");
    const types = data.types.map((type: any) => type.type.name).join(", ");
    const moves = data.moves.map((move: any) => move.move.name);

    const spriteUrl = data.sprites.front_default;

    const statsHTML = data.stats.map((stat: any) => `
        <tr>
            <td>${stat.stat.name}</td>
            <td>${stat.base_stat}</td>
        </tr>
    `).join("");

    const movesHTML = `
        <div id="moves-table">
            <h3>Moves:</h3>
            <table>
                <tr>
                    <th>Move</th>
                </tr>
                ${generateMovesTableRows(moves)}
            </table>
        </div>
    `;

    const detailsHTML = `
        <div id="details-table">
            <h3>Details:</h3>
            <table>
                <tr>
                    <th>ID</th>
                    <td>${id}</td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>${name}</td>
                </tr>
                <tr>
                    <th>Abilities</th>
                    <td>${abilities}</td>
                </tr>
                <tr>
                    <th>Types</th>
                    <td>${types}</td>
                </tr>
                <tr>
                    <th>Image</th>
                    <td>
                        <img id="pokemonImage" src="${spriteUrl}" alt="Pokemon Sprite">
                    </td>
                </tr>
            </table>
        </div>
    `;

    return `
        <div class="pokemon-info">
            ${detailsHTML}
            <div id="details-stats">
                <h3>Stats:</h3>
                <table>
                    <tr>
                        <th>Stat</th>
                        <th>Value</th>
                    </tr>
                    ${statsHTML}
                </table>
            </div>
            ${movesHTML}
        </div>
    `;
}


function generateMovesTableRows(moves: any[]): string {
    return moves.map(moveName => {
        return `
            <tr>
                <td>${moveName}</td>
            </tr>
        `;
    }).join("");
}
