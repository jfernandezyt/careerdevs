package com.company;

class Car{
    private String color;
    private String manufacturer;

    public Car(){

    }
    public Car(String manufacturer) {
        this.manufacturer = manufacturer;
    }


    public Car(String color, String manufacturer){
        this.color = color;
        this.manufacturer = manufacturer;
    }


    public String getColor() {
        return color;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String toString(){
        return "Color: " + getColor() + " | Manufacturer: " + getManufacturer();
    }
}

class SaloonCar extends Car{
    private int numberOfSeats;

    public SaloonCar(){

    }

    public SaloonCar(int numberOfSeats){
        this.numberOfSeats = numberOfSeats;
    }

    public SaloonCar(int numberOfSeats, String manufacturer){
        super(manufacturer);
        this.numberOfSeats = numberOfSeats;
    }
    public SaloonCar(int numberOfSeats, String manufacturer, String color){
        super(color, manufacturer);
        this.numberOfSeats = numberOfSeats;
    }

    public int getNumberOfSeats() {
        return numberOfSeats;
    }

    public void setNumberOfSeats(int numberOfSeats) {
        this.numberOfSeats = numberOfSeats;
    }

    public String toString(){
        String output;
        if(getManufacturer() == null && getColor() == null){
            return "Seats: " + getNumberOfSeats();
        }else if(getColor() == null){
            return "Manufacturer: " + getManufacturer() + " | Seats: " + getNumberOfSeats();
        }

        return "Color: " + getColor() + " | Manufacturer: " + getManufacturer() + " | Seats: " + getNumberOfSeats();
    }
}


public class Main {


    public static void main(String[] args) {

        Car car1 = new Car("Red", "Toyota");

        System.out.println(car1.toString());

        SaloonCar sCar1 = new SaloonCar(2);
        SaloonCar sCar2 = new SaloonCar(3, "Nissan");
        SaloonCar sCar3 = new SaloonCar(4, "Ford", "Purple");

        System.out.println(sCar1.toString());
        System.out.println(sCar2.toString());
        System.out.println(sCar3.toString());


    }
}
