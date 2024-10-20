import { DataSource } from 'typeorm';
import { entities } from './entities';


export const AppDataSource = new DataSource({
    type: 'mysql', // hoặc loại cơ sở dữ liệu bạn đang sử dụng
    host: 'localhost', // Đặt hostname của MySQL
    port: 3306, // Đặt port của MySQL
    username: 'root', // Đặt username của MySQL
    password: '1234@', // Đặt password của MySQL
    database: 'hp', // Đặt tên database của MySQL
    synchronize: false, // Để false vì chúng ta sẽ sử dụng migration
    logging: true,
    entities: entities, // Thêm các entity của bạn vào đây
    migrations: ['src/migration/*.ts'],
    subscribers: [],
  });
  
  AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization:', err);
    });