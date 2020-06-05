import Knex from 'knex';

const tableName = 'items';

export const seed = async (knex: Knex) => {
  await knex(tableName).insert([
    { image: 'lampadas.svg', title: 'Lâmpadas' },
    { image: 'baterias.svg', title: 'Pilhas e baterias' },
    { image: 'papeis-papelao.svg', title: 'Papéis e Papelão' },
    { image: 'eletronicos.svg', title: 'Resíduos Eletrônicos' },
    { image: 'organicos.svg', title: 'Resíduos Orgânicos' },
    { image: 'oleo.svg', title: 'Óleo de Cozinha' },
  ]);
};
